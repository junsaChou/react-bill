import  { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const billStore = createSlice({
    name:'bill',
    // 数据state
    initialState:{
        billList: []
    },
    reducers:{
        //  同步修改方法
        setBillList(state,action){
            state.billList = action.payload
        }
    }
})

// 解构 actionCreate 函数
const { setBillList }  = billStore.actions;

const getBillList = () =>{
    return async(dispatch)=>{
        // 编写异步请求
        const res = await axios.get('http://localhost:8888/ka');
        // 触发同步reducer
        dispatch(setBillList(res.data))
    }
}



// 导出reducer
export { getBillList }
const reducer = billStore.reducer

export default reducer