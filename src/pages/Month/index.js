import { NavBar,DatePicker} from 'antd-mobile'
import { useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import './index.scss'

const Month = () =>{
    // 控制弹窗的打开和关闭
    const [ dateVisible,setDateVisible ] = useState(false)

    // 控制时间显示
    const [ currentDate,setCurrentDate ] = useState(()=>{
        return  dayjs( new Date()).format('YYYY-MM')
    })

    const onConfirm = (date) =>{
        setDateVisible(false)
        // 其他逻辑

        console.log( date)
        const formatDate = dayjs( date).format('YYYY-MM')
        setCurrentDate(formatDate)
    }

    return (
        <div className='monthLyBill'>
            <NavBar className='nav' backArrow={false}>
                月度收支
            </NavBar>
            <div className='content'>
                <div className='header'>
                    {/* 时间切换区域 */}
                    <div className='date' onClick={ ()=>setDateVisible(true)}>
                        <span className='text'>
                            {currentDate + ''}月账单
                        </span>
                        {/* 根据弹窗状态 控制 朝上 或者朝下 */}
                        <span className= {classNames( 'arrow', dateVisible && 'expand') }></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className='item'>
                            <div className='money'>
                                { 100 }
                            </div>
                            <div className='type'>
                                支出
                            </div>
                        </div>
                        <div className='item'>
                            <div className='money'>
                                { 200 }
                            </div>
                            <div className='type'>
                                收入
                            </div>
                        </div>
                        <div className='item'>
                            <div className='money'>
                                { 100 }
                            </div>
                            <div className='type'>
                                结余
                            </div>
                        </div>
                        {/*时间选择器 */}
                        <DatePicker
                            className='kaDate'
                            title='记账日期'
                            precision='month'
                            visible={dateVisible}
                            onCancel={()=>setDateVisible(false)}
                            onConfirm={onConfirm}
                            onClose={()=>setDateVisible(false)}
                            max={ new Date()}
                            />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Month