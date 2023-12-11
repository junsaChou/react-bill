import { NavBar,DatePicker} from 'antd-mobile'
import { useMemo, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
// 按月进行分组  lodash 两个参数 第一项是当前对象 第二项是逻辑
import _ from 'lodash'
import './index.scss'

const Month = () =>{
    // 按月数据分组
    const billList = useSelector( state => state.bill.billList )
    /* 数据的二次处理*/
    const monthGroup = useMemo(()=>{
        // return 出去计算之后的值
        return _.groupBy(billList,(item)=> dayjs(item.date).format('YYYY-MM'))
    },[billList])

    console.log( monthGroup)
    // 控制弹窗的打开和关闭
    const [ dateVisible,setDateVisible ] = useState(false)

    // 控制时间显示
    const [ currentDate,setCurrentDate ] = useState(()=>{
        return  dayjs( new Date()).format('YYYY-MM')
    })
    // 确认回调
    const [ currentMonthList,setMoonthList ] = useState([]);
    const monthResult = useMemo(()=>{
        // 支出 /收入 /结余
        const pay = currentMonthList.filter(item=>item.type === 'pay').reduce((a,c)=> a+ c.money,0) || 0
        const income = currentMonthList.filter(item=>item.type === 'income').reduce((a,c)=> a+ c.money,0) || 0
        return{
            pay,
            income,
            total: pay + income
        }

    },[currentMonthList])

    const onConfirm = (date) =>{
        setDateVisible(false)
        // 其他逻辑
        const formatDate = dayjs( date).format('YYYY-MM')
        if( monthGroup.hasOwnProperty(formatDate) ){
            setMoonthList(monthGroup[formatDate]) 
        }else{
            setMoonthList([])
        }
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
                                { monthResult.pay.toFixed(2) }
                            </div>
                            <div className='type'>
                                支出
                            </div>
                        </div>
                        <div className='item'>
                            <div className='money'>
                                {  monthResult.income.toFixed(2) }
                            </div>
                            <div className='type'>
                                收入
                            </div>
                        </div>
                        <div className='item'>
                            <div className='money'>
                                { monthResult.total.toFixed(2) }
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