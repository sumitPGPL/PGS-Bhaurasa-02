import React from "react";

import AboutMessageCard from "@/components/AboutMessageCard/AboutMessageCard";

import AboutMessageCarosoul from "@/components/AboutMessageCarosoul/AboutMessageCarosoul";
import AboutFacultyCard from "@/components/AboutFacultyCard/AboutFacultyCard";

export default function page() {
  return (
    <>
      <main className="w-full min-h-full flex flex-col p-5  justify-center items-center dark:bg-dpurple bg-[url('/MessageSvg.svg')]">
        <div className="w-full flex flex-col justify-center items-center mt-9">
          <h1 className="text-3xl p-3 text-center  font-bold">
            FACULTY AT THE SCHOOL
          </h1>
          <h2 className=" text-center text-4xl mt-5 font-extrabold text-tgreen">
            Pratibha Global School, Bhaurasa
          </h2>
          <h3 className=" text-center text-2xl mt-2 font-semibold text-tgreen">
            SESSION 2024-25
          </h3>
          <div className="w-11/12 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-5 lg:gap-5 md:gap-4  lg:p-5 mt-2">
          <AboutFacultyCard
              img="/staff/amrita.jpg"
              name="Amrita"
              post="M.A. D.El.Ed."
            />
            <AboutFacultyCard
              img="/staff/manisha.jpg"
              name="Manisha"
              post="M.Com B.Ed M.A."
            />
            <AboutFacultyCard
              img="/staff/meena.jpg"
              name="Meena"
              post="NTT Teacher"
            />
            <AboutFacultyCard
              img="/staff/ritu.jpg"
              name="Ritu Patel"
              post="M.Com"
            />
           
          </div>
        </div>
      </main>
    </>
  );
}
