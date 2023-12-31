import { NavBar,DatePicker} from 'antd-mobile'
// useMemo 计算
import { useMemo, useState,useEffect } from 'react'
import './index.scss'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
// 按月进行分组  lodash 两个参数 第一项是当前对象 第二项是逻辑
import _ from 'lodash'
import DayBill from './components/DayBill'


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

    // 初始化时 显示当前月的统计数据
    useEffect(()=>{
        const nowDate = dayjs().format('YYYY-MM');
        console.log( nowDate)
        console.log( monthGroup)
        // 边界值控制
        if( monthGroup[nowDate]){
            setMoonthList( monthGroup[nowDate])
        }
 
    },[monthGroup])

    const onConfirm = (date) =>{
        setDateVisible(false)
        // 其他逻辑
        const formatDate = dayjs( date).format('YYYY-MM')
        // if( monthGroup.hasOwnProperty(formatDate) ){
        if( monthGroup[formatDate]){
            setMoonthList(monthGroup[formatDate]) 
        }else{
            setMoonthList([])
        }
        setCurrentDate(formatDate)
    }
    // 当前月 按照日来做分组
    const dayGroup = useMemo(()=>{
        // return 出去计算之后的值
        const groupByData = _.groupBy(currentMonthList,(item)=> dayjs(item.date).format('MM-DD'))
        const keys = Object.keys(groupByData)
        return { 
            groupByData,
            keys 
        }
    },[currentMonthList])

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
                            <span className='money'>
                                { monthResult.pay.toFixed(2) }
                            </span>
                            <span className='type'>
                                支出
                            </span>
                        </div>
                        <div className='item'>
                            <span className='money'>
                                {  monthResult.income.toFixed(2) }
                            </span>
                            <span className='type'>
                                收入
                            </span>
                        </div>
                        <div className='item'>
                            <span className='money'>
                                { monthResult.total.toFixed(2) }
                            </span>
                            <span className='type'>
                                结余
                            </span>
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
                {/* 单日列表统计 */}
                {
                    dayGroup.keys.map(key=>{
                        return    <DayBill key={key} date={key} billList={ dayGroup.groupByData[key] }/>
                    })
                }
             
            </div>
        </div>
    )
}

export default Month