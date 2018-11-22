import Const from 'ct-adc-const';
const con = new Const();

con.add({
    type: [
        {key: 1, val: '类型1'}, {key: 2, val: '类型2'}, {key: 3, val: '类型3'}
    ],
    state: [
        {key: 0, val: '状态0'}, {key: 1, val: '状态1'}, {key: 2, val: '状态2'}
    ]
});

export default con;
