'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api';
import { Plus, Search, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

interface Keyword {
  _id: string;
  keyword: string;
  isActive: boolean;
  createdAt: string;
}

export default function KeywordsPage() {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchKeywords();
  }, []);

  const fetchKeywords = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getKeywords();
      setKeywords(data);
    } catch (error) {
      console.error('Error fetching keywords:', error);
    } finally {
      setLoading(false);
    }
  };

  const addKeyword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim()) return;

    try {
      setAdding(true);
      const keyword = await apiClient.addKeyword(newKeyword.trim());
      setKeywords([keyword, ...keywords]);
      setNewKeyword('');
    } catch (error: any) {
      console.error('Error adding keyword:', error);
      alert(error.message || 'Failed to add keyword');
    } finally {
      setAdding(false);
    }
  };

  const deleteKeyword = async (id: string) => {
    if (!confirm('Are you sure you want to delete this keyword?')) return;

    try {
      await apiClient.deleteKeyword(id);
      setKeywords(keywords.filter(k => k._id !== id));
    } catch (error) {
      console.error('Error deleting keyword:', error);
    }
  };

  const toggleKeyword = async (id: string) => {
    try {
      const updatedKeyword = await apiClient.toggleKeyword(id);
      setKeywords(keywords.map(k => k._id === id ? updatedKeyword : k));
    } catch (error) {
      console.error('Error toggling keyword:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Keywords</h1>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Keywords</h1>
          <p className="text-muted-foreground">
            Manage the keywords you want to monitor across social platforms.
          </p>
        </div>
      </div>

      {/* Add Keyword Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Keyword</CardTitle>
          <CardDescription>
            Add keywords, brand names, or phrases you want to monitor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addKeyword} className="flex space-x-2">
            <Input
              placeholder="Enter keyword to monitor..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={adding || !newKeyword.trim()}>
              <Plus className="w-4 h-4 mr-2" />
              {adding ? 'Adding...' : 'Add Keyword'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Keywords List */}
      <div className="space-y-4">
        {keywords.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-muted-foreground mb-4">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No keywords yet</h3>
                <p>Add your first keyword to start monitoring mentions.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {keywords.map((keyword) => (
              <Card key={keyword._id} className="transition-all hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-lg">{keyword.keyword}</h3>
                        <p className="text-sm text-muted-foreground">
                          Added {new Date(keyword.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={keyword.isActive ? 'default' : 'secondary'}>
                        {keyword.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleKeyword(keyword._id)}
                      >
                        {keyword.isActive ? (
                          <ToggleRight className="w-4 h-4 text-green-600" />
                        ) : (
                          <ToggleLeft className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteKeyword(keyword._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{keywords.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {keywords.filter(k => k.isActive).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inactive Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {keywords.filter(k => !k.isActive).length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}