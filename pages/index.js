import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const recipeEntries = await client.getEntries({ content_type: "recipe" });
  const articleEntries = await client.getEntries({ content_type: "article" });

  return {
    props: {
      recipes: recipeEntries.items,
      articles: articleEntries.items,
    },
  };
}

export default function Recipes({ recipes, articles }) {
  console.log(recipes);
  console.log(articles);

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}

      <div className="article-list">
        {articles.map((article) => (
          <div key={article.sys.id} className="article-card">
            <h2>{article.fields.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
