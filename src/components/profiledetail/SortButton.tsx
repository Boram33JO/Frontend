import React from "react";
import { styled } from "styled-components";

export enum SortType {
  Newest = "Newest",
  Oldest = "Oldest",
  wishlistCount = "wishlistCount",
  viewCount = "viewCount",
}

interface SortButtonProps {
  activeSort: SortType;
  onSortChange: (sort: SortType) => void;
}

const SortButton: React.FC<SortButtonProps> = ({ activeSort, onSortChange }) => {
  const sortlist = [
    {
      id: SortType.Newest,
      sort: "최신순",
    },
    {
      id: SortType.Oldest,
      sort: "과거순",
    },
    {
      id: SortType.wishlistCount,
      sort: "좋아요순",
    },
    {
      id: SortType.viewCount,
      sort: "조회순",
    },
  ];

  return (
    <SortList>
      {sortlist.map((item) => (
        <SortListItem
          key={item.id}
          $active={activeSort === item.id}
          onClick={() => onSortChange(item.id)}
        >
          {item.sort}
        </SortListItem>
      ))}
    </SortList>
  );
};

export default SortButton;

const SortList = styled.div`
  display: flex;
  gap: 10px;
  box-sizing: border-box;
  /* margin-bottom: 10px; */
`;

const SortListItem = styled.div<{ $active: boolean }>`
  background: ${(props) =>
    props.$active
      ? "#7462E2"
      : "#3B3A40"};
  color: ${(props) => (props.$active ? "#FAFAFA" : "#85838D")};
  border-radius: 30px;
  padding: 4px 14px;
  text-align: center;
  font-weight: 600;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background: #7462E2;
    color: #FAFAFA;
  }
`;
