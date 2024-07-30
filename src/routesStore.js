
var routesStore = [
    {
        name:'مالیات',
        path:'/tax/',
        fields:[
            {title:'id',pk:true},
            {title:'name',titleFa:'نام',type:'text'},
            {title:'rate',titleFa:'درصد',type:'number'},
        ],
        api:'http://localhost:8000/tax/'
    },
    {
        name:'مشتریان',
        path:'/customer/',
        fields:[
            {title:'id',pk:true},
            {title:'name',titleFa:'نام'},
            {title:'email',titleFa:'ایمیل'},
            {title:'phone',titleFa:'شماره موبایل',type:'phone'},
            {title:'website',titleFa:'صفحه وب'},
            {title:'address',titleFa:'آدرس'}
        ],
        api:'http://localhost:8000/customer/'
    },
    {
        name:'تامین کننده',
        path:'/vendor/',
        fields:[
            {title:'id',pk:true},
            {title:'name',titleFa:'نام'},
            {title:'email',titleFa:'ایمیل'},
            {title:'phone',titleFa:'شماره موبایل',type:'phone'},
            {title:'website',titleFa:'صفحه وب'},
            {title:'address',titleFa:'آدرس'}
        ],
        api:'http://localhost:8000/vendor/'
    },
    {
        name:'برنامه روزانه',
        path:'/todo/',
        fields:[
            {title:'userId',titleFa:'شناسه کاربر'},
            {title:'id',pk:true},
            {title:"title",titleFa:'عنوان کار'},
            {title:'completed',titleFa:'وضعیت',type:'boolean'}
        ],
        api:'https://jsonplaceholder.typicode.com/todos/'
    },
    {
        name:'پیتزا',
        path:'/pizza/',
        fields:[
            {title:'id',pk:true},
            {title:'name',titleFa:'نام'},
            {title:'price',titleFa:'قیمت',type:'number'}
        ],
        api:'http://127.0.0.1:8000/pizza/'
    },
    {
        name:'حساب بانکی',
        path:'/bank/',
        fields:[
            {title:'id',pk:true},
            {title:'accountNumber',titleFa:'شماره حساب'},
            {title:'owner',titleFa:"مالک حساب"},
            {title:"balance",titleFa:"موجودی حساب",type:'number'},
            {title:'currency',titleFa:'نام ارز',type:'key',keyapi:'http://127.0.0.1:8000/currency/',targetField:'name'},
            {title:'Bank',titleFa:'نام بانک'},
        ],
        api:'http://127.0.0.1:8000/bankaccount/'
    },
    {
        name:'دسته بندی',
        path:'/cate/',
        fields:[
            {title:'id',pk:true},
            {title:'name',titleFa:'نام',type:'text'},
            {title:'type',titleFa:'نوع',type:'key',keyapi:'http://127.0.0.1:8000/category_type/',targetField:'name'},
            {title:'color',titleFa:'رنگ'}
        ],
        api:'http://127.0.0.1:8000/category/'
    },
    {
        name:'محصولات',
        path:'/item/',
        fields:[
            {title:'id',pk:true},
            {title:'name',titleFa:'نام'},
            {title:'type',titleFa:'نوع',type:'key',keyapi:'http://127.0.0.1:8000/item_type/',targetField:'name'},
            {title:'category',titleFa:'دسته بندی',type:'key',keyapi:'http://127.0.0.1:8000/category/',targetField:'name'},
            {title:'salePrice',titleFa:'قیمت فروش',type:'number'},
            {title:'saleCurrency',titleFa:'ارز فروش',type:'key',keyapi:'http://127.0.0.1:8000/currency/',targetField:'name'},
            {title:'saleTax',titleFa:'مالیات',type:'key',keyapi:'http://127.0.0.1:8000/tax/',targetField:'name'},
            {title:'purchasePrice',titleFa:'قیمت خرید',type:'number'}
        ],
        api:'http://127.0.0.1:8000/item/'
    }
]
export default routesStore