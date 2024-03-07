"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { getAllNews } from "@/lib/services/news/index";
import Card from "@/components/Card/Card";
import useModalBodyScrollLock from "@/hooks/useModalBodyScrollLock";
import NewsModal from "@/components/Modal/NewsModal";
import NewNewsCard from '@/components/Card/NewNewsCard'

const NewsCard = ({ news }) => {
  return (
    <NewNewsCard
      title={news.title}
      description={news.content}
      learnMoreLink={news.reDirectLink}
      imageUrl={news.thumbNail}
      textSize="14px"
      uuid={news.uuid}
      
    />
  );
};

const NewsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const newsData = await getAllNews();
        setNewsList(newsData);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []); // Run the effect only once on component mount

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 m-auto">
        {isLoading ? (
          <p>Loading news...</p>
        ) : (
          <>
            {newsList.map((news) => (
              <NewNewsCard key={news.id} news={news} />
              
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const NewsPage = () => {
  // const [data, setData] = useState(images);
  // const [isLoading, setLoading] = useState(fa);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(0); // Change the number of items per page to 10
  const [totalPages, setTotalPages] = useState(0);
  const [preview, setPreview] = useState({ state: false, imgSrc: "" });

  useModalBodyScrollLock(preview.state);
  // const cardStyle = { width: "18rem" };

  useEffect(() => {
    setItemPerPage(10);
    setTotalPages(Math.ceil(itemsPerPage));
  }, [currentPage, itemsPerPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // if (isLoading) return <Loader />;
  // if (!data || data.length === 0) return <p>No profile data</p>;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 4;

    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`mx-2 px-3 py-1 border hover:bg-gradient-to-r from-violet-300 to-violet-400 rounded-md cursor-pointer ${
            currentPage === i ? "bg-gray-200" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  const showPreview = (imgSrc) => {
    setPreview({ state: true, imgSrc });
  };
  const hidePreview = () => {
    setPreview({ state: false, imgSrc: "" });
  };
  return (
    <div className="news-page">
      {preview.state && (
        <NewsModal
          onCancle={hidePreview}
          show={preview.state}
          imgSrc={preview.imgSrc}
        />
      )}

      <div
        className="w-full bg-white py-10 bg-cover "
        style={{ backgroundImage: "url('/Rect Light.svg')" }}
      >
        <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px]  px-4 md:px-0 mx-auto">
          <div className="flex flex-col  justify-center gap-4 text-center">
            <p className="py-2 text-2xl text-[#8b21cf] font-medium">
              News Section
            </p>
            <h1 className="md:leading-[72px] py-2 md:text-6xl text-4xl font-semibold">
              Our School <span className="text-[#8b21cf]">in The News </span>
            </h1>
            {/* <p className='py-2 text-lg text-center text-gray-600'>At Pratibha Global School, we welcome you to embark on an exciting educational journey for your child. Our admission process is designed to be transparent, straightforward, and inclusive. Here's a step-by-step guide to joining our school.
                            </p> */}
          </div>
        </div>
      </div>
      <div className="p-12">
        {" "}
        <NewsList />
      </div>

      <div className="flex items-center justify-center mt-6">
        <button
          onClick={prevPage}
          className={`px-4 py-2 border hover:bg-gradient-to-r from-violet-300 to-violet-400 rounded-md ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {renderPageNumbers()}
        <button
          onClick={nextPage}
          className={`px-4 py-2 border hover:bg-gradient-to-r from-violet-300 to-violet-400 rounded-md ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsPage;
