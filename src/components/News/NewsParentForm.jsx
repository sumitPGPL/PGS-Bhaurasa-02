
'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getAllNews, deleteNews } from '@/lib/services/news/index';
import NewsForm from '@/components/News/NewsForm';
import NewsTable from '@/components/News/NewsTable';
import { getAuthToken } from '@/lib/middleware/apiInceptor';

const NewsPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [selectedNewsId, setSelectedNewsId] = useState(null);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const newsData = await getAllNews();
      setNewsList(newsData);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (uuid) => {
    try {
      setIsLoading(true);
      await deleteNews(uuid);
      fetchNews();
    } catch (error) {
      console.error('Error deleting news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (uuid) => {
    setSelectedNewsId(uuid);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken(); // Get authentication token from cookies
        if (!token) {
          router.push('/admin/login'); // Redirect to login page if token is not present
          return;
        }
        setIsLoading(true);
        await fetchNews();
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="news-page">
      <NewsForm selectedNewsId={selectedNewsId} onFormSubmit={fetchNews} newsList={newsList} />
      <NewsTable newsList={newsList} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default NewsPage;
