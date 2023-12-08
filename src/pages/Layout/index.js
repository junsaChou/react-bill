import { Outlet} from 'react-router-dom'
import { Button} from 'antd-mobile'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getBillList } from '@/store/modules/billStore'
const Layout = () =>{
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getBillList())
    },[dispatch])
    return(
        <div>
            <Outlet/>
             我是layout组件
            {/* 测试全局组件是否生效 */}
            <Button color='primary'>测试全局</Button>
                <div className='pupple'> 
                    <Button color='primary'>测试局部</Button>
            </div>
        </div>
    )

}

export default Layout