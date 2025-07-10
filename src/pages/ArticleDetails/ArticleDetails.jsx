import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ArticleDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/article/${id}`).then((res) => setArticle(res.data));
  }, [id, axiosSecure]);

  if (!article) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <img src={article.image} className="w-full rounded mb-4" alt="" />
      <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-4">Publisher: {article.publisher}</p>
      <p>{article.description}</p>
    </div>
  );
};

export default ArticleDetails;