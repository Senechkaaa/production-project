import { ArticleDetailsCommentSchema } from "./ArticleDetailsCommentSchema";
import { ArticleDetailsRecommendationsSchema } from "./ArticleDetailsRecommendationSchema";

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentSchema;
    recommendation: ArticleDetailsRecommendationsSchema
}