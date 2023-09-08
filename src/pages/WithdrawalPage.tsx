// import { useNavigate } from "react-router-dom";
// import { styled } from "styled-components";
// import FindNav from "../components/UserInformation/FindNav";
// import DeleteUser from "../components/UserInformation/DeleteUser";
// import { ReactComponent as Bullet } from "../assets/images/login_signup_profile/bullet.svg";
// import NotFoundPage from "./NotFoundPage";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/config/configStore";

// const EmailPage = () => {
//   const navigate = useNavigate();
//   const LoginUser = useSelector((state: RootState) => state.user);


//   if (LoginUser.isLogin === false) {
//     return <NotFoundPage />;
//   }
//   return (
//     <>

//     <Container>
//       <InnerContainer>
//         <H3> 정말 P.Ple을 <br />떠나실 건가요...?</H3>
//         <H4> 피플을 떠나시기 전에 아래 사항을 확인해 주세요.</H4>
//         <StBox2>
          
//         <PwChange>
         
//               <Wrapper>
           
//                 <ArrowWrapper>  1. 작성하신 게시물과 댓글은 영구 삭제됩니다.</ArrowWrapper>
                
//                 <ArrowWrapper>   2. 팔로워 정보가 영구 삭제됩니다.</ArrowWrapper>
             
              
//                 <ArrowWrapper>   3. 가입 시의 개인 정보는 영구 삭제됩니다.</ArrowWrapper>
            
//                 </Wrapper>
//               </PwChange>

//               {/*<PwChange>
         
//                <Wrapper>
//                 <Stbox3>
//                 <ArrowWrapper>  <Bullet/>작성하신 게시물과 댓글은 영구 삭제됩니다.</ArrowWrapper>
//                 </Stbox3>
//                 <Stbox3>
//                 <ArrowWrapper>   <Bullet/>작성하신 게시물과 댓글은 영구 삭제됩니다.</ArrowWrapper>
//                 </Stbox3>
//                 <Stbox3>
//                 <ArrowWrapper>   <Bullet/>작성하신 게시물과 댓글은 영구 삭제됩니다.</ArrowWrapper>
//                 </Stbox3>
//                 </Wrapper>
//               </PwChange> */}
            
//         </StBox2>
        
//         <LoginSection>
//           <DeleteUser />
//         </LoginSection>

//           {/* <SignUp>
//           <div>피플을 계속 이용하시나요?</div>
//           &nbsp;
//           <Stlink2 onClick={() => { navigate('/') }}>돌아가기</Stlink2>
//         </SignUp> */}

//       </InnerContainer>
//     </Container>
//     </>
//   );
// };

// export default EmailPage;


// const Container = styled.div`
//     /* position: relative; */
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     width: 390px;
//     min-height: 80vh;
//     margin: auto; 
// `

// const InnerContainer = styled.div`
//   /* padding-top: 30px; */
//   padding-top: 36px;
//   display: flex;
//   flex-direction: column;
//   /* justify-content: space-between; */
//   width: 100%;
//   height: 600px;
// `

// const H3 = styled.h3`
//   font-size: 28px;
//   color: #e7e6f0;
//   font-weight: 500;
//   line-height: 36px;
//   padding-left: 20px;
//   padding-top: 36px;
// `;

// const StBox2 = styled.h3`

// border-radius: 8px;
// background-color: #252427;
// height: 124px;
// margin: 20px;
// padding: 16px;
// `;


// const Stbox3 = styled.h3`

// `;


// const H4 = styled.div`
// font-size: 16px;
// color: #e7e6f0;
// font-weight: 500;
// padding-left: 20px;
// padding-top: 20px;;
// `

// const LoginSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding-top: 20px;
// `

// const SignUp = styled.div`
//   color: #b2b2b2;
//   font-weight: 500;
//   display: flex;
//   align-items: center; /* 요소들을 수직으로 가운데 정렬 */
//   justify-content: center; /* 요소들을 수평으로 가운데 정렬 */
//   flex-direction: row; /* 요소들을 가로로 배치 */
//   font-size: 16px;
//   padding-top: 200px;
// `;

// const Stlink2 = styled.a`
//   text-decoration: underline;
//   font-size: 16px;
//   line-height: 24px;
//   font-weight: 500;
//   cursor: pointer;
//   color: #b2b2b2; 
// `;

// const PwChange = styled.div`
//   color: #E7E6F0;
//   display: flex;
//   align-items: center;
//   box-sizing: border-box;
  
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   width: 100%; 
  

// // const Container = styled.div`
// //   cursor: pointer;
// //   display: flex; /* Make the container a flex container */
// //   align-items: center; /* Center align its children vertically */
 
// // `;




import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import FindPassword from "../components/UserInformation/FindPassword";
import FindNav from "../components/UserInformation/FindNav";
import NotFoundPage from "./NotFoundPage";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";
import DeleteUser from "../components/UserInformation/DeleteUser";


const WithdrawalPage = () => {
  const navigate = useNavigate();
  const LoginUser = useSelector((state: RootState) => state.user);


  if (LoginUser.isLogin === false) {
    return <NotFoundPage />;
  }



  return (
    <>
    <Container>
      <InnerContainer>
      <H3> 정말 P.Ple을 <br />떠나실 건가요...?</H3>
       <H4> 피플을 떠나시기 전에 아래 사항을 확인해 주세요.</H4>
       <Wrapper>
           
                         <ArrowWrapper>  1. 작성하신 게시물과 댓글은 영구 삭제됩니다.</ArrowWrapper>
                           
                           <ArrowWrapper>   2. 팔로워 정보가 영구 삭제됩니다.</ArrowWrapper>
                        
                         
                    <ArrowWrapper>   3. 가입 시의 개인 정보는 영구 삭제됩니다.</ArrowWrapper>
                       
                         </Wrapper>

        <LoginSection>
          {/* <FindPassword /> */}
          <DeleteUser />
        </LoginSection>


      </InnerContainer>
    </Container>
    </>
  );
};

export default WithdrawalPage;

const Container = styled.div`
    /* position: relative; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 390px;
    min-height: 80vh;
    margin: auto;
    box-sizing: border-box;
    
`

const InnerContainer = styled.div`
  /* padding-top: 30px; */
  padding-top: 36px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  width: 100%;
  height: 600px;
  box-sizing: border-box;
`

const H3 = styled.h3`
  font-size: 28px;
  color: #e7e6f0;
  font-weight: 600;
  line-height: 24px;
  padding-left: 20px;
  line-height: 1.1;
  /* margin-top: 20px; */
`;

const H4 = styled.div`
font-size: 16px;
color: #e7e6f0;
font-weight: 500;
padding-left: 20px;
padding-top: 20px;;
`


const Ment = styled.div`
  font-size: 16px;
  color: #85848b;
  font-weight: 500;
  line-height: 24px;
  padding-left: 20px;
  padding-top: 30px;
`;

const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`

const SignUp = styled.div`
  color: #b2b2b2;
  font-weight: 500;
  display: flex;
  align-items: center; /* 요소들을 수직으로 가운데 정렬 */
  justify-content: center; /* 요소들을 수평으로 가운데 정렬 */
  flex-direction: row; /* 요소들을 가로로 배치 */
  font-size: 16px;
  padding-top: 200px;
`;

const Stlink2 = styled.a`
  text-decoration: underline;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  cursor: pointer;
  color: #b2b2b2; 
`;

const Wrapper = styled.div`
  display: flex; // 요소들을 수평으로 나란히 정렬하기 위해 추가
  align-items: left;
  flex-direction: column;
  background-color: #252427;
  margin: 20px;
  padding: 10px;
  border-radius: 8px;
`;

const ArrowWrapper = styled.div`
  padding-left: 10px;
  color: #E7E6F0;
  font-size: 16px;
  font-weight: 500;
`;