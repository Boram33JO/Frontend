import React from "react";
import { styled } from "styled-components";

export enum SortType {
  Newest = "Newest",
  Oldest = "Oldest",
  wishlistCount = "wishlistCount",

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
  margin-bottom: 10px;
`;

const SortListItem = styled.div<{ $active: boolean }>`
  background: ${(props) =>
    props.$active
      ? "linear-gradient(135deg, #8084F4,#C48FED)"
      : "#58468B"};
  color: ${(props) => (props.$active ? "#FAFAFA" : "#9280BA")};
  border-radius: 30px;

  padding: 8px 16px;
  text-align: center;

  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background: linear-gradient(135deg, #8084F4, #C48FED);
    color: #FAFAFA;
  }
`;
