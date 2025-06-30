import { supabase } from './supabase'
import type { User, Keyword, Mention, MentionStats } from './supabase'

class ApiClient {
  // Auth methods
  async signUp(email: string, password: string, name: string) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) throw authError

    if (authData.user) {
      // Create user profile
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            email,
            name,
            plan: 'free'
          }
        ])
        .select()
        .single()

      if (userError) throw userError

      return {
        user: userData,
        session: authData.session
      }
    }

    throw new Error('Failed to create user')
  }

  async signIn(email: string, password: string) {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) throw authError

    // Get user profile
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (userError) throw userError

    return {
      user: userData,
      session: authData.session
    }
  }

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return null

    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) throw error
    return userData
  }

  // Keywords methods
  async getKeywords(): Promise<Keyword[]> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('keywords')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async addKeyword(keyword: string): Promise<Keyword> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    // Check keyword limits
    const { data: existingKeywords } = await supabase
      .from('keywords')
      .select('id')
      .eq('user_id', user.id)
      .eq('is_active', true)

    const { data: userData } = await supabase
      .from('users')
      .select('plan')
      .eq('id', user.id)
      .single()

    const keywordCount = existingKeywords?.length || 0
    let maxKeywords = 1 // free plan
    if (userData?.plan === 'pro') maxKeywords = 5
    if (userData?.plan === 'enterprise') maxKeywords = Infinity

    if (keywordCount >= maxKeywords) {
      throw new Error(`Keyword limit reached for ${userData?.plan} plan`)
    }

    // Check if keyword already exists
    const { data: existing } = await supabase
      .from('keywords')
      .select('id')
      .eq('user_id', user.id)
      .eq('keyword', keyword.toLowerCase())
      .single()

    if (existing) {
      throw new Error('Keyword already exists')
    }

    const { data, error } = await supabase
      .from('keywords')
      .insert([
        {
          user_id: user.id,
          keyword: keyword.toLowerCase(),
          is_active: true
        }
      ])
      .select()
      .single()

    if (error) throw error
    return data
  }

  async deleteKeyword(id: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { error } = await supabase
      .from('keywords')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw error
  }

  async toggleKeyword(id: string): Promise<Keyword> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    // Get current keyword
    const { data: keyword, error: fetchError } = await supabase
      .from('keywords')
      .select('is_active')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (fetchError) throw fetchError

    // Toggle the status
    const { data, error } = await supabase
      .from('keywords')
      .update({ is_active: !keyword.is_active })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Mentions methods
  async getMentions(page: number = 1, limit: number = 20): Promise<{
    mentions: Mention[]
    pagination: { page: number; limit: number; total: number; pages: number }
  }> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const offset = (page - 1) * limit

    // Get total count
    const { count } = await supabase
      .from('mentions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    // Get mentions with keyword info
    const { data, error } = await supabase
      .from('mentions')
      .select(`
        *,
        keyword:keywords(keyword)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    return {
      mentions: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit)
      }
    }
  }

  async markMentionAsRead(id: string): Promise<Mention> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('mentions')
      .update({ is_read: true })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async getMentionStats(): Promise<MentionStats> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('mentions')
      .select('platform, is_read')
      .eq('user_id', user.id)

    if (error) throw error

    const stats = {
      total: data?.length || 0,
      unread: data?.filter(m => !m.is_read).length || 0,
      twitter: data?.filter(m => m.platform === 'twitter').length || 0,
      reddit: data?.filter(m => m.platform === 'reddit').length || 0,
      linkedin: data?.filter(m => m.platform === 'linkedin').length || 0,
      youtube: data?.filter(m => m.platform === 'youtube').length || 0,
    }

    return stats
  }
}

export const apiClient = new ApiClient()