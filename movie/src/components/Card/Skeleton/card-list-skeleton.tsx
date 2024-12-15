import CardSkeleton from "./card-skeleton";

type CardListSkeletonProps = {
  number: number; // number prop의 타입 정의
};

const CardListSkeleton: React.FC<CardListSkeletonProps> = ({ number }) => {
  return (
    <>
      {new Array(number).fill(0).map((_, idx) => (
        <CardSkeleton key={idx} number={number} />
      ))}
    </>
  );
};

export default CardListSkeleton;
