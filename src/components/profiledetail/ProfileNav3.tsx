import styled from 'styled-components';

interface Props {
    nav: number,
    setNav: React.Dispatch<React.SetStateAction<number>>,
    isYours: boolean
}

const ProfileNav3 = ({ nav, setNav, isYours }: Props) => {
    const navbar = ["포스팅", "피플포스팅", "피플러", "댓글관리"];
    const navbar2 = ["포스팅", "피플러"]
    return (
        <NavigatorContainer>
            {isYours
                ? navbar.map((item, index) => {
                    return (
                        <Navigator key={index} $active={index === nav} onClick={() => setNav(index)}>
                            {item}
                        </Navigator>
                    )
                })
                : navbar2.map((item, index) => {
                    return (
                        <Navigator key={index} $active={index === nav} onClick={() => setNav(index)}>
                            {item}
                        </Navigator>
                    )
                })
            }
        </NavigatorContainer>
    );
};

export default ProfileNav3;

const NavigatorContainer = styled.div`
    display: flex;
    font-family: "Pretendard";
    font-size: 16px;
    font-weight: 700;
    justify-content: space-between;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 2px solid #5b5b5b;    
`;

const Navigator = styled.div<{ $active?: boolean }>`
    text-align: center;
    padding-bottom: 5px;
    margin-bottom: -2px;
    cursor: pointer;
    color: ${(props) => (props.$active ? ' #E7E6F0;' : '#5b5b5b')};
    border-bottom: ${(props) => (props.$active ? '2px solid #8084f3' : 'none')};
`;