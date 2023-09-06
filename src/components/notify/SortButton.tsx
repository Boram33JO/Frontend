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
        }
    ]

    return (
        <SortList>
            {
                sortList.map(item => {
                    return (
                        <SortListItem
                            key={item.id}
                            onClick={item.onClick}
                            $active={(clicked === item.id) ? true : false}
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

const SortListItem = styled.div<{ $active: boolean }>`
    background: ${(props) => (props.$active === true ? "#7462E2" : "#3B3A40")};
    color: ${(props) => (props.$active === true ? "#FAFAFA" : "#85838D")};
    font-weight: 600;
    border-radius: 30px;

    padding: 8px 16px;
    text-align: center;

    box-sizing: border-box;
    cursor: pointer;
`