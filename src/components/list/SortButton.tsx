import React, { useState } from "react"
import { styled } from "styled-components"

interface Props {
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
    setDirection: React.Dispatch<React.SetStateAction<string>>;
}

const SortButton = ({ setSortBy, setDirection }: Props) => {
    const [clicked, setClicked] = useState<Number>(1);
    const handleCategoryClick = (id: number, sortBy: string, direction: string) => {
        setClicked(id)
        setSortBy(sortBy);
        setDirection(direction);
    }
    const sortList = [
        {
            id: 1,
            name: "최신순",
            onClick: () => handleCategoryClick(1, "createdAt", "desc")
        },
        {
            id: 2,
            name: "과거순",
            onClick: () => handleCategoryClick(2, "createdAt", "asc")
        },
        {
            id: 3,
            name: "좋아요순",
            onClick: () => handleCategoryClick(3, "wishlistCount", "desc")
        },
        {
            id: 4,
            name: "조회순",
            onClick: () => handleCategoryClick(4, "viewCount", "desc")
        },
    ]

    return (
        <SortList>
            {
                sortList.map(item => {
                    return (
                        <SortListItem
                            key={item.id}
                            onClick={item.onClick}
                            $active={(clicked === item.id) ? "true" : "false"}
                        >
                            {item.name}
                        </SortListItem>
                    )
                })
            }
        </SortList>
    )
}

export default SortButton

const SortList = styled.div`
    display: flex;
    gap: 10px;
    box-sizing: border-box;
`

const SortListItem = styled.div<{ $active: string }>`
    background: ${(props) => (props.$active === "true" ? "linear-gradient(135deg, #8084F4,#C48FED)" : "#58468B")};
    color: ${(props) => (props.$active === "true" ? "#FAFAFA" : "#9280BA")};
    border-radius: 30px;

    padding: 8px 16px;
    text-align: center;

    box-sizing: border-box;
    cursor: pointer;

    &:hover{
        background: linear-gradient(135deg, #8084F4,#C48FED);
        color: #FAFAFA;
    }
`