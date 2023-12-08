import { Outlet} from 'react-router-dom'
const Layout = () =>{
    return(
        <div>
            <Outlet/>
            <div> 我是layout组件</div>
        </div>
    )

}

export default Layout