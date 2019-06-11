import React, { Component } from 'react';
import DefaultHeader from './DefaultHeader';
import DefaultContent from "./DefaultContent";
import DefaultSidebar from './DefaultSidebar';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import history from '../../history/history';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {Header, Content, Footer, Sider} = Layout;







class DefaultLayout extends Component {
  constructor(props){
    super(props);
      this.state = {
        // passUrl: "/user",
        passUrl: this.props.location.pathname
     }
  }

  componentWillMount(){
    const checkToken =  window.localStorage.getItem("session");
    if(checkToken){
    }else{
      history.push('/login')
    }
    const key = `7ZuK49myCgqfWqYwE#JtgghSydq3aY4SrSLDLUTpP2ch7VkKKhb&nj=mp?&D*#n$%rQCb3kxnzGp+TA#_4GmFQ285gRF428y9RF@WYJTzvy@DfUTt_2ePx3n6+E8MLv2YVCnrR6km?DfXhP-kY5bRtKYWn!VfrZ#CNRn&k+QA5fjZEtg+$!8jL@Z$EqLB+wQz_4H5a4k%Q=AdT##eD=77AMNjqHGy?PYCjTFUNqw#S?chZpaF55ALH7MfkHnqSPB!#fzNg+eCg_mgp^xYg!47Dd?uKsf=+Sbx=VnF-L4cK8pXRE*z8eJuMS#gHaXZqePZQJGZDqXEguEf?-9rGLqAHVAvJ9V=Q-SM__NZLe7-&W7^aCT4n3E2&G28*G#^GM6$g4yj_#KeFpPPTFW+qnnJELRYLp_H6Ng^wT&J-fR4nMDuy8YJRw!9TgQZ7kfUvtdU7LkFB_ZjzqWgzXN@+WH+FXFr8uh^Zhm@x?P8KcD$fNu5nJ75Vnw_8r=rKrhqxWYKG2-%7Qn!Tt3LffdybQhkGkT83$Y?jL!mag!@DJ$fx5SstVC2gAZepa@VC=#%p7MtQ$W-nP$$6^TV!ZuqZ^^$N^_?%^Hc9y86ZySam*2BtzzFu^9uwfQseNp=j7Y*LNu+Ptz2w79KH!z5X=qzNkPUq*dy535q3HhBTY_S5fG&*6#F+ZvTEExJELZa?b!rvtP+nKfZePW#x6gY4pT!2E8vDuBvf-vFLDZZH+57*C2ts_Vgt#-9=68=pX@p@$!_n?6tw^E34pq+p6zwbWc_6tzNawYv9wERK4cZBygHBh5Wp-3N&bx2t$BgR@V&G82b^78vgJ^CmVS*C3#VM#+C!gxHX#VyqF4X=BMEfApsDR@ZaFsJnEuE$f!*LWtjCZxPdt*k9WT*+Dn$3LB#767nz?W$?4Zfy9#N^hzy^&y=Bp#qt^*-je+67sZb6%fcHH=+vdD=j8f=Bs#-FN!WZgdnbVMGSqAwpd*BPLVNtSNGu&jzfJL8cpWtYtGN&HE2+br$+rDtXHKUQad6tKWzS23*?r4M=2huxEGuMss*?x@*72T?Be@gt872aPE*FUka&+LZJfDQg2ZyC*88HrsJPKRaLY^dQeQdhjfLC3n*r4-mp?nafV%V*_CaqNEh5sf@$zJ^ZhmTeSgfcZKdb4!NR^J&a&?5TKWLTg$y$t4f9kx6Ezr$z=L^EHd66v+tA@Sp5hZEr&PRz7@*rcv4W2ntpqv9UVPJtrcWFw+Ju^hd^#s8T7A$S?3T#*G^UW+gUZmZC$FWfUhYxNbE=sW+vLZj+x9XF&CzNG7mD4mbq^pR?tg!_6*w_#vb9+jPWVbxu%EtzC*Uy_u!#B!KTr+GnpXaY8Ns&r2xpT39X&FJ_+BcBst8FpJkbK5TEGYee$uFy=bqG2Ph2LaZFt3UPW#VRK9jEpTFCjV#E8K89msLuyDhdDMWSefB-v%N=*eHCGU+?*U#qGGrxnucU++uB5MRY^Ke86!x*4hacPxyhSgNv&c!FFQNEDDus_-zUH2kU39!8nt$kkjcu#@^KckSp3c_T2V4FkNXA^qDd5GqDuZZRmhq8R6AmZPKrZJ+f3X32SdEg9tdTnt%FKpFA9j3r@Xr7Y%EELW4839J74gdJwSvNDMuF?&@B!E7A%9z&eh8VHhg5^rhe4tN#Ya+HcVwa+SzSe8^Xw77hA$Arv2RkfNN#TRru!$KBSZ*SbpzxDH$VU8?yW3nWzE3EsBm!GK8xR7QuxKW-?=WVnsjfuJ?B%q37BprbEs5!t2Q$S!ayxeQLfR9YV%=c@28%d6EZRxR_g65CLHGWUx!UNbt**NCL*7Vy_$ht=YC6wubAMyaVyL-#pJW2P=qe?AN&DW^^hL?jmFQh9Vxj#abEPwCTsQ8hPTKDK2jYFMZv#5J4WAeGH%!^DCk78G?WPXaPccEh$=MmUJYB^ZGQvvXvU@Bfm?ShgPkMsernv!zWaC*!xrh&P22HmCse3E@WEwx56?x46RDc@=Y$E-3#VCVPr5SB_z8T_rpS=v7Kc^YxxK$h-3%Y$U#zUaCGHX6&SqCrD7`
		try{
			const token = jwt.verify(checkToken, key)
      if(checkToken){
      }

		}catch(err){
      // alert('session expired')
      localStorage.removeItem("session")

		  history.push('/login')
		}
  }

  checkThisPathname = () => {
    if(this.props.location.pathname == "/"){
      const passUrlVar= "/user"

      this.setPathname(passUrlVar)
    }

  }

  setPathname = (e) => {
    this.setState({
       passUrl:e
    })
  }



  componentDidMount(){
    this.checkThisPathname()
  }


  render() {
   return (
     <div>
       <div>
         <Layout>
             <DefaultSidebar passUrl={this.state.passUrl}/>
               <Content  style={{ background: '#fff', margin: 0, minHeight: 280 }}>
                  <DefaultContent/>
               </Content>
         </Layout>
       </div>
     </div>
   );
  }
}

export default DefaultLayout;
