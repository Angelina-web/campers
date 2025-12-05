import { Camper } from "@/types/camper";

type ReviewsProps = {
  camper: Camper;
};

export default function Reviews({ camper }: ReviewsProps) {
  if (!camper || !camper.reviews) return null;

  return (
    <div>
      {camper.reviews.map((review, index) => (
        <div key={index}>
          <div>
            <div>{review.reviewer_name[0]}</div>

            <div>
              <p>{review.reviewer_name}</p>

              <div>
                {Array.from({ length: review.reviewer_rating }).map((_, i) => (
                  <svg key={i}>
                    <use href="/icons.svg#icon-star" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
