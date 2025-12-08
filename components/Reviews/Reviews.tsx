import { Camper } from "@/types/camper";
import css from "./Reviews.module.css";

type ReviewsProps = {
  camper: Camper;
};

export default function Reviews({ camper }: ReviewsProps) {
  if (!camper || !camper.reviews || camper.reviews.length === 0) return null;

  return (
    <div className={css.reviewContainer}>
      {camper.reviews.map((review, index) => (
        <div key={index} className={css.reviewElement}>
          <div className={css.review}>
            <div className={css.reviewPhoto}>{review.reviewer_name[0]}</div>

            <div className={css.reviewNameContainer}>
              <p className={css.reviewName}>{review.reviewer_name}</p>

              <div className={css.reviewRating}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width={16}
                    height={16}
                    className={`${css.star} ${
                      i < review.reviewer_rating
                        ? css.starFilled
                        : css.starEmpty
                    }`}
                  >
                    <use href="/icons.svg#icon-star" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          <p className={css.reviewText}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
