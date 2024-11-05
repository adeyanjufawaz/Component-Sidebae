"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

function GetDocument({ params }) {
  const blogID = params.blogID;
  const [documentData, setDocumentData] = useState();
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true);
      try {
        // Reference to the specific document in the Firestore collection
        const docRef = doc(db, "blogs", blogID); // Replace "collectionName" with your collection name
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDocumentData(docSnap.data()); // Get the document's data
          setDocs([...docs, docSnap.data()]);
        } else {
          setError("Document not found");
        }
      } catch (err) {
        console.error("Error fetching document:", err);
        setError("Failed to fetch document.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-10">
      {console.log(documentData)}
      {console.log(docs)}
      {docs.map((doc) => {
        const {
          author,
          blogContent,
          blogTitle,
          datePublished,
          category,
          id,
          img,
          publisherID,
        } = doc;
        return (
          <div  key={id} className="flex justify-start  items-center ">
            <div>
              <h1 className="text-xl capitalize font-semibold ">{blogTitle}</h1>
              <button className="cursor-auto bg-pry p-2 md:p-3 text-xs lg:text-base font-medium  mt-6 text-white">
                {category}
              </button>
              <p className="mt-6">{blogContent}</p>
              <div className="flex flex-col mt-6  ">
                <p className="text-xs  lg:text-base ">
                  <b>Author</b>: {author} 
                </p>
                <p className="text-xs lg:text-base">
                  {datePublished}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default GetDocument;

// const {
//   author,
//   blogContent,
//   blogTitle,
//   datePublished,
//   category,
//   id,
//   img,
//   publisherID,
// } = blog;
