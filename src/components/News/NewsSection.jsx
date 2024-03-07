"use client";
import React, { useEffect, useRef, useState } from "react";
import NewsCarousel from "../Carousel/NewsCarousel";
import { getAllNews } from "@/lib/services/news/index";
import { getEvent } from "@/lib/services/events/eventSevices";
import Link from "next/link";

export default function LatestNews() {
  const [newsData, setNewsData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [mixedData, setMixedData] = useState([]);
  const listRef = useRef(null);

  const fetchNews = async () => {
    try {
      const newsDatas = await getAllNews();
      const newsItemsWithType = newsDatas.map((news) => ({
        ...news,
        type: "news",
      }));
      setNewsData(newsItemsWithType);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const fetchEvents = async (page) => {
    try {
      const eventData = await getEvent({ limit: 6, page });
      const eventItemsWithType = eventData.data.map((event) => ({
        ...event,
        type: "event",
      }));
      setEventData(eventItemsWithType);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  useEffect(() => {
    const listElement = listRef.current;
    const autoScroll = () => {
      listElement.scrollTop += 1;
      // console.log('listElement.scrollHeight', listElement.scrollTop + listElement.clientHeight, listElement.scrollHeight,)
      if (
        listElement.scrollTop + listElement.clientHeight >=
        listElement.scrollHeight - 1
      ) {
        listElement.scrollTop = 0; // Reset to the top
      }
    };
    let scrollInterval = setInterval(autoScroll, 50);
    listElement.addEventListener("mouseover", () => {
      clearInterval(scrollInterval);
    });
    listElement.addEventListener("mouseout", () => {
      clearInterval(scrollInterval);
      scrollInterval = setInterval(autoScroll, 50);
    });

    return () => clearInterval(scrollInterval);
  }, []);

  useEffect(() => {
    fetchNews();
    fetchEvents(1); // Fetch events when the component mounts
  }, []);

  useEffect(() => {
    // Mix news and event data only once
    const mixedArray = [...newsData, ...eventData];
    setMixedData(shuffleArray(mixedArray));
  }, [newsData, eventData]);

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col mt-10">
        <h2 className="text-black text-2xl font-bold">News & Notices</h2>
        <h6 className="text-2xl text-black font-bold">
          _________________________
        </h6>
        <h5 className="text-black text-2xl font-bold">
          BE UPDATED ALL THE TIME
        </h5>
      </div>
      <div className="flex flex-col sm:flex-row w-full mt-10">
        <div className="w-full sm:w-1/2 p-1 h-[350px]">
          <h2 className="text-2xl bg-[#c983fd] p-2 text-center">
            Latest Update 2023-24
          </h2>
          <div className="w-full bg-slate-300 mx-auto">
            <NewsCarousel mixedData={mixedData} />
          </div>
        </div>
        <div className="gap-4 p-1 h-[382px] w-full">
          <div className="w-full">
            <h2 className="text-2xl bg-[#c983fd] p-2 text-center">
              Latest News ,Events & Notices
            </h2>
            <div className="bg-bgreen h-full w-full mx-auto">
              <div className="flex mx-auto w-full h-full items-center justify-center">
                <ul
                  ref={listRef}
                  className="bg-bgreen w-full overflow-auto grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 p-1 max-h-[376px]"
                >
                  {mixedData.map((item, index) => (
                    <ListItem key={index} item={item} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const ListItem = ({ item }) => {
  const { title, date, thumbNail, type } = item;

  return (
    <li className="border-gray-400 flex flex-col">
      <Link href={type === "news" ? "/news" : "/events"}>
        <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-3 ">
          {thumbNail ? (
            <div className="w-36 ">
              <img
                src={thumbNail}
                className="flex flex-col h-[70px] rounded-md w-32 text-2xl bg-gray-300 text-black justify-center items-center mr-4"
                alt={type === "news" ? "News Image" : "Event Image"}
              />
            </div>
          ) : (
            <div className="flex flex-col max-h-[70px] rounded-md max-w-32 text-2xl bg-gray-300 text-black justify-center items-center mr-4">
              No Image Available
            </div>
          )}
          <div className="flex flex-col mr-2">
            <div className="font-bold text-sm">{title}</div>
            <div className="text-gray-600 text-sm">{date}</div>
          </div>
          {type === "news" && (
            <div className="bg-blue-200 rounded-md p-2">News</div>
          )}
          {type === "event" && (
            <div className="bg-[#ecd5ff] rounded-md p-2">Event</div>
          )}
        </div>
      </Link>
    </li>
  );
};

// Function to shuffle array items
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
