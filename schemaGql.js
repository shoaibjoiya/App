const typeDefs = `
  scalar Date
  
  type Query {
   
    getProjectById(id: ID!): Project
    getProject(page: Int, rows: Int, search: String): ProjectResult!
    Warehousebyid(id: ID!): Warehouse
    getWarehouse(page: Int, rows: Int, search: String): WarehouseResult!
    getPartyEntryById(id: ID!): PartyEntry
    getPartyEntry(page: Int, rows: Int, search: String, acctype: String): PartyEntryResult!    
    getTaskById(id: ID!): Task
    getTask(page: Int, rows: Int, search: String): TaskResult!
    getCategory(page: Int, rows: Int, search: String,sortby: String): CategoryResult!
    categorybyid(id: ID!): Category
    getExpcategory(page: Int, rows: Int, search: String): ExpCategoryResult!
    Expcategorybyid(id: ID!): ExpCategory
    getBrands(page: Int, rows: Int, search: String): BrandResult!
    brandsbyid(id: ID!): Brand
    getUnits(page: Int, rows: Int, search: String): UnitResult!
    unitsbyid(id: ID!): Unit
    getItems(page: Int, rows: Int, search: String, cateid: ID,sortby: String): ItemResult!
    getStocks(warehouseId: String, cateid: String, brandid: String, page: Int): StockData
    itemById(id: ID!): ItemWithName
    getSaleBill(page: Int, rows: Int, search: String,whareid: String ,billstatus: String): BillSaleResult!
    getWasteBill(page: Int, rows: Int, search: String): BillWasteResult
    saleBillById(id: ID!): BillSaleWithName
    getSaleReturnBill(page: Int, rows: Int, search: String): BillSaleReturnResult!
    saleReturnBillById(id: ID!): BillReturnSaleWithName
    getPurchanseBill(page: Int, rows: Int, search: String): BillPurchaseResult!
    billPurchaseById(id: ID!): BillPurchase
    getPurchaseReturnBill(page: Int, rows: Int, search: String): BillPurchaseReturnResult!
    billPurchaseReturnById(id: ID!): BillPurchaseReturn
    getquotationBill(page: Int, rows: Int, search: String): QuotationBillResult!
    getTransferBill(page: Int, rows: Int, search: String): TransferBillResult!
    getAdjustmentBill(page: Int, rows: Int, search: String): AdjustmentBillResult!
    getTasksByProjectId(projectid: ID!): [Task]
    getExpenseEntryById(id: ID!): ExpenseEntryWiteName
    getExpenseEntries(page: Int, rows: Int, search: String): ExpenseEntriesResponse!
    getSellerById: Seller!
    getUserById: [User]
    kitchenById(id: ID!): Kitchen
    getKitchens(search: String, page: Int, rows: Int): GetKitchensResponse
    waiterById(id: ID!): Waiter
    getWaiters(search: String, page: Int, rows: Int): GetWaitersResponse
    tableById(id: ID!): Table
    getTables(search: String, page: Int, rows: Int): GetTablesResponse
    riderById(id: ID!): Rider
    getRiders(search: String, page: Int, rows: Int): GetRidersResponse
    chefById(id: ID!): Chef
    getChefs(search: String, page: Int, rows: Int): GetChefsResponse
    getProductionBills(search: String, page: Int, rows: Int): ProductionBillPagination
    getProductionDoBills(search: String, page: Int, rows: Int): ProductionDoBillPagination

    ReportgetsaleBills(warehouseId: ID,customerId: ID,userIds: ID,paymentStatus: String,startDate: String!,endDate: String!,page: Int): SaleBillReport!
    ReportTodaySalesBetween(warehouseId: ID,customerId: ID,userIds: ID,paymentStatus: String,startDate: String!,endDate: String!): Float!
    ReportTotalPendingCash: Float!
    ReportTotalSales: Float!
    ReportTotalSalesUser(startDate: String!, endDate: String!): Float
    ReportTodaySales: Float!
    ReportPreviousDaySales: Float!
    ReportgetsalereturnBills(warehouseId:ID,customerId:ID,userIds:ID,paymentStatus:String, startDate: String!, endDate: String!, page: Int): SaleReturnBillReport!
    ReportTodaySalesreturnBetween(warehouseId: ID,customerId: ID,userIds: ID,paymentStatus: String,startDate: String!,endDate: String!): Float!
    ReportTotalPendingsalereturnCash: Float!
    ReportTotalsalereturn: Float!
    dailyProfit(startDate: String!): Float!

    ReportgetsalePurchaseBills(warehouseId:ID,customerId:ID,userIds:ID,paymentStatus:String, startDate: String!, endDate: String!, page: Int): SaleBillPurchaseReport!
    ReportTotalPendingPurchaseCash: Float!
    ReportTodayPurBetween(warehouseId: ID,customerId: ID,userIds: ID,paymentStatus: String,startDate: String!,endDate: String!): Float!
    ReportTotalPurchase: Float!

    ReportgetPurchasereturnBills(warehouseId:ID,customerId:ID,userIds:ID,paymentStatus:String, startDate: String!, endDate: String!, page: Int): PurchasereturnBills!
    ReportTodayPurreturnBetween(warehouseId: ID,customerId: ID,userIds: ID,paymentStatus: String,startDate: String!,endDate: String!): Float!
    ReportTotalPendingpurchasereturnCash: Float!
    ReportTotalPurchasereturn: Float!

    ReportgetExpense(warehouseId: ID, customerId: ID, startDate: String, endDate: String, page: Int): PartyEntryReport!
    ReportTotalExpense: Float!
    # Add queries with parameters warehouseId and customerId
    LedgerTotalPurchasepay(warehouseId: ID!, customerId: ID!): Float
    LedgerotalPurchasereturnpay(warehouseId: ID!, customerId: ID!): Float
    LedgerToatalSalpay(warehouseId: ID, customerId: ID): Float
    Ledgerotalsalereturnpay(warehouseId: ID, customerId: ID): Float
    
 ReportTotalDiscount: Float
 ReportTotalDiscountCart: Float
    getSumByWarehouse(warehouseId: ID): WarehouseSummary!
    searchSales(criteria: SalesSearchCriteria): [BillSaleWithName]

    getMonthlyData: [MonthlyData]
}
   type MonthlyData {
  month: String
  totalSales: Float
  totalPurchases: Float
  totalExpenses: Float
}


 
type WarehouseSummary {
  totalCost: Float!
  totalRetail: Float!
}
 input SalesSearchCriteria {
    cateid: ID
    whareid: ID
    custid: ID
    productid: ID
    userid: ID
    startDate: String
    endDate: String
  }

# Define the input type for adding new tables
input AddNewTableInput {
  name: String!
  tablesize: String
  reserved: Boolean
  area: String
}

# Define the Table type
type Table {
  _id: ID!
  name: String!
  tablesize: String
  reserved: Boolean
  area: String
  createdAt: String!
}

type GetTablesResponse {
  tables: [Table]
  tablesCount: Int
}
# Define the input type for adding new waiters
input AddNewWaiterInput {
  name: String!
  commission: Float
  charges: Float
  address: String
  phone: String
  vehicleNumber: String
  homeNumber: String
}

# Define the Waiter type
type Waiter {
  _id: ID!
  name: String!
  commission: Float
  charges: Float
  address: String
  phone: String
  vehicleNumber: String
  homeNumber: String
  createdAt: String!
}


# Define the response type for the paginated list of waiters
type GetWaitersResponse {
  waiters: [Waiter]
  waitersCount: Int
}



type GetKitchensResponse {
  kitchens: [Kitchen]
  kitchensCount: Int
}

type StockData {
  stockItems: [Stock]
  totalCount: Int
  totalCost: Float
  totalRetail: Float
}
type Stock {
  productId: ItemWithName
  warehouseId: ID
  quantity: Float
  createdAt: String
}
type TotalExpense {
  totalAmount: Float
}

    type PartyEntryReport {
    PartyEntry: [ExpenseEntryWiteName]!
    PartyEntryCount: Int!
}
  type SaleBillReport {
    bills: [BillSaleWithName!]!
    totalCount: Int!
  }
  type SaleReturnBillReport {
    returnbills: [BillReturnSaleWithName!]!
    totalreturnCount: Int!
  }
  type SaleBillPurchaseReport {
    bills: [BillPurchase!]!
    totalCount: Int!
  }
  type PurchasereturnBills {
    bills: [BillPurchaseReturn!]!
    totalCount: Int!
  }
  type PartyEntryResult {
    PartyEntry: [PartyEntry]!
    PartyEntryCount: Int!
  }
  type AuthPayload {
    token: String
    user: User
    sellerInfo: Seller  # Add sellerInfo field
  }
  type PartyEntry {
    _id: ID!
    name: String!
    email: String
    phoneNumber: String
    country: String
    city: String
    address: String
    acctype: String
    partytype: Boolean
  }
type ExpenseEntry {
  _id: ID!
  date: Date
  notes: String
  wareid: String
  cateid: String
  amount: Float
}
type ExpenseEntryWiteName
{
  _id: ID!
  date: Date
  notes: String
  wareid: Warehouse
  cateid: ExpCategory
  amount: Float
}

type ExpenseEntriesResponse {
  expenseEntries: [ExpenseEntryWiteName]!
  expenseEntryCount: Int!
}

input CreateExpenseEntryInput {
  date: Date
  notes: String
  wareid: String
  cateid: String
  amount: Float
}

 type ProjectResult {
    project: [Project!]!
    projectcount: Int!
  }
  type WarehouseResult {
    warehouse: [Warehouse!]!
    warehousecount: Int!
  }
  type Warehouse {
    _id: ID!
    name: String!
    location: String
    createdAt: String!
  }
  type Project {
    _id: ID!
    title: String!
    description: String
    startDate: Date!
    endDate: Date
    status: String!
    userid: String!
  
  }
  type TaskResult {
    tasks: [Task!]!
    taskscount: Int!
  }
  
  type ExpCategoryResult {
    expcategories: [Category!]!
    expcategoryCount: Int!
  }
  
  type CategoryResult {
    categories: [Category!]!
    categoryCount: Int!
  }
  type BrandResult {
    brands: [Brand!]!
    brandsCount: Int!
  }
  type UnitResult {
    units: [Unit!]!
    unitsCount: Int!
  }
  type ItemResult {
    items: [ItemWithName!]!
    itemCount: Int!
  }
  type BillSaleResult {
    saleBills: [BillSaleWithName!]!
    saleBillCount: Int!
  }
  type BillWasteResult {
    wasteBills: [BillWasteWithName!]!
    wasteBillCount: Int!
  }
  type BillSaleReturnResult {
    saleReturnBills: [BillReturnSaleWithName!]!
    saleReturnBillCount: Int!
  }
  type BillPurchaseResult{
    billPurchase: [BillPurchase!]!
    billPurchaseCount: Int!
  }
  type BillPurchaseReturnResult{
    billPurchaseReturn: [BillPurchaseReturn!]!
    billPurchaseReturnCount: Int!
  }
  type QuotationBillResult{
    billquotation: [QuotationBillWithName!]!
    billquotationCount: Int!
  }
  type TransferBillResult{
    billtransfer: [TransferBillWithName!]!
    billtransferCount: Int!
  }
  type AdjustmentBillResult{
    billadjustment: [AdjustmentBill!]!
    billadjustmentCount: Int!
  }
  type Task {
    _id: ID!
    title: String!
    description: String
    dueDate: Date!
    status: String
    projectid: String!
    userid: String!
  }
  type ProductionBillPagination {
  productionBill: [ProductionItem!]!
  totalCount: Int!
}
    type ProductionDoBillPagination {
  productionBill: [ProductionDoItem!]!
  totalCount: Int!
}
  type ItemWithName {
    _id: ID!
    productname: String!
    code: String
    brandid: Brand
    cateid: Category
    unitid: Unit
    barcode: [String]
    cost: String
    price: String
    wsprice: String
    discount: String
    alertqty: String
    stockqty: String
    whareid: String
    tax: String
    ordernote: String
    createdAt: String
  }
  
  type Item {
    _id: ID!
    productname: String!
    code: String
    brandid: String
    cateid: String
    unitid: String
    barcode: [String]
    cost: String
    price: String
    wsprice: String
    discount: String
    alertqty: String
    stockqty: String
    whareid: String
    tax: String
    ordernote: String
  }

  type User {
    _id: ID!
    name: String!
    role: String
    mobileno: String!
    password: String!
    verified: Boolean
    sellerid:String!
  }

  type Token {
    token: String!
  }

  type Category {
    _id: ID!
    name: String!
    createdAt: String
  }
type ExpCategory {
    _id: ID!
    name: String!
    createdAt: String!
  }

  type Brand {
    _id: ID!
    name: String!
    createdAt: String!
  }
input AddNewKitchenInput {
  name: String!
  description: String
  categoryIds: [ID]
}

# Define the Kitchen type
type Kitchen {
  _id: ID!
  name: String!
  description: String
  createdAt: String
  categoryIds: [Category]
  }
  type Unit {
    _id: ID!
    name: String!
    basename: String!
    createdAt: String!
  }

  type BillSaleWithName {
    _id: ID
    saleid:Int
    billdate: Date
    whareid: Warehouse
    custid: PartyEntry
    discount: Float
    saletax: Float
    shippingcharges: Float
    totalamount: Float
    cashreceived: Float
    receivedamount:Float
    billstatus: String
    paymentstatus: String
    paymentMode: String
    notes: String
    invoiceNumberfbr: String
    customerName: String
    mobileNumber: String
    deliveryAddress: String
    riderName: String
    riderid: String
    waiterName: String
    waiterid: String
    tableName: String
    tabileid: String
    chefid: String
    kitchenid: String
    orderType: String
    salecart: [SaleCartItem]
    createdAt: Date
    updatedAt: Date
  }
  
   type BillWasteWithName {
    _id: ID!
    wasteid:Int
    billdate: Date
    whareid: Warehouse
    custid: String
    discount: Float
    saletax: Float
    shippingcharges: Float
    totalamount: Float
    cashreceived: Float
    receivedamount:Float
    billstatus: String
    paymentstatus: String
    paymentMode: String
    notes: String
    invoiceNumberfbr: String
    customerName: String
    mobileNumber: String
    deliveryAddress: String
    riderName: String
    riderid: String
    waiterName: String
    waiterid: String
    tableName: String
    tabileid: String
    chefid: String
    kitchenid: String
    orderType: String
    wastecart: [WasteCartItem]
    createdAt: Date
    updatedAt: Date
  }

  type BillReturnSale {
    _id: ID!
    billdate: Date
    whareid: String
    custid: String
    discount: Float
    saletax: Float
    shippingcharges: Float
    totalamount: Float
    cashreceived: Float
    billstatus: String
    paymentstatus: String
    paymentMode: String
    notes: String
    returncart: [SaleReturnCartItem]
    createdAt: Date
    updatedAt: Date
  }
  type BillReturnSaleWithName {
    _id: ID!
    saleretid:String
    billdate: Date
    whareid: Warehouse
    custid: PartyEntry
    discount: Float
    saletax: Float
    shippingcharges: Float
    totalamount: Float
    cashreceived: Float
    billstatus: String
    paymentstatus: String
    paymentMode: String
    notes: String
    returncart: [SaleReturnCartItem]
    createdAt: Date
    updatedAt: Date
  }
  type SaleCartItem {
    id: ID
    name: String
    price: Float
    quantity: Float
    discount: Float
    tax: Float
    kotqty: Float
    
  }
      type WasteCartItem {
    id: ID
    name: String
    price: Float
    quantity: Float
    discount: Float
    tax: Float

  }
  type SaleReturnCartItem {
    id: ID
    name: String
    price: Float
    quantity: Float
    discount: Float
    tax: Float
  }
  type BillPurchase {
    _id: ID!
    purid:String
    billdate: Date!
    whareid: Warehouse
    custid: PartyEntry
    discount: Float
    saletax: Float
    shippingcharges: Float
    totalamount: Float
    cashreceived: Float
    billstatus: String
    paymentstatus: String
    paymentMode: String
    notes: String
    purchasecart: [PurchaseCartItem]  # Assuming you have a type for purchase cart items
    createdAt: Date
    updatedAt: Date
  }
  
  type PurchaseCartItem {
    id: ID
    name: String
    price: Float
    quantity: Float
    discount: Float
    tax: Float
  }
  
  # Define input types for mutations
  input PurchaseCartItemInput {
    id: ID
    name: String
    price: Float
    quantity: Float
    discount: Float
    tax: Float
  }
  
  input CreateBillPurchaseInput {
    billdate: Date!
    whareid: String!
    custid: String!
    discount: Float
    saletax: Float
    shippingcharges: Float
    totalamount: Float
    cashreceived:Float
    billstatus: String
    paymentstatus: String
    paymentMode: String
    notes: String
    purchasecart: [PurchaseCartItemInput]

  }
  

  type QuotationBill {
    _id: ID!
    billdate: Date!
    whareid: String!
    custid: String!
    discount: Float
    saletax: Float
    shippingcharges: Float
    totalamount: Float
    cashreceived: Float
    billstatus: String
    paymentstatus: String
    paymentMode: String
    notes: String
    ordercart: [ordercart]  # Assuming you have a type for purchase cart items
    createdAt: Date!
    updatedAt: Date!
  }
  type QuotationBillWithName {
    _id: ID!
    billdate: Date!
    orderid:String
    whareid: Warehouse
    custid: PartyEntry
    discount: Float
    saletax: Float
    shippingcharges: Float
    totalamount: Float
    cashreceived: Float
    billstatus: String
    paymentstatus: String
    paymentMode: String
    notes: String
    ordercart: [ordercart]  # Assuming you have a type for purchase cart items
    createdAt: Date!
    updatedAt: Date!
  }
  type TransferBill {
    _id: ID!
    billdate: Date!
    whareid: String!
    custid: String!
    discount: Float
    saletax: Float
    shippingcharges: Float
    totalamount: Float
    billstatus: String
    paymentstatus: String
    paymentMode: String
    notes: String
    transfercart: [Transfercart]  # Assuming you have a type for purchase cart items
    createdAt: Date!
    updatedAt: Date!
  }

  type TransferBillWithName {
    _id: ID!
    billdate: Date!
    transid:String
    whareid: Warehouse
    custid: Warehouse
    discount: Float
    saletax: Float
    shippingcharges: Float
    totalamount: Float
    cashreceived:Float
    billstatus: String
    paymentstatus: String
    paymentMode: String
    notes: String
    transfercart: [Transfercart]  # Assuming you have a type for purchase cart items
    createdAt: Date!
    updatedAt: Date!
  }
  type AdjustmentBill {
    _id: ID!
    adjustid:String
    billdate: Date!
    whareid: Warehouse
    custid: String
    discount: Float
    saletax: Float
    shippingcharges: Float
    totalamount: Float
    cashreceived:Float
    billstatus: String
    paymentstatus: String
    paymentMode: String
    notes: String
    adjustcart: [Adjustcart]  # Assuming you have a type for purchase cart items
    createdAt: Date!
    updatedAt: Date!
  }
  type BillPurchaseReturn {
    _id: ID!
    purretid:String
    billdate: Date!
    whareid: Warehouse
    custid: PartyEntry
    discount: Float
    saletax: Float
    shippingcharges: Float
    totalamount: Float
    cashreceived: Float
    billstatus: String
    paymentstatus: String
    paymentMode: String
    notes: String
    purreturncart: [PurchaseCartReturnItem]  # Assuming you have a type for purchase cart items
    createdAt: Date!
    updatedAt: Date!
  }
  
  type PurchaseCartReturnItem {
    id: ID
    name: String
    price: Float
    quantity: Float
    discount: Float
    tax: Float
  }
  type ordercart {
    id: ID
    name: String
    price: Float
    quantity: Float
    discount: Float
    tax: Float
  }
  type Transfercart {
    id: ID
    name: String
    price: Float
    quantity: Float
    discount: Float
    tax: Float
  }
  type Adjustcart {
    id: ID
    name: String
    price: Float
    quantity: Float
    adjusttype: String
    discount: Float
    tax: Float
  }
  
  # Define input types for mutations
  input PurchaseCartItemReturnInput {
    id: ID
    name: String
    price: Float
    quantity: Float
    discount: Float
    tax: Float
  }
  
  input ordecartQuotationInput {
    id: ID
    name: String
    price: Float
    quantity: Float
    discount: Float
    tax: Float
  }
  input TransfercartInput {
    id: ID
    name: String
    price: Float
    quantity: Float
    discount: Float
    tax: Float
  }
  input AdjustcartInput {
    id: ID
    name: String
    price: Float
    quantity: Float
    adjusttype: String
    discount: Float
    tax: Float
  }
  input CreateBillPurchaseReturnInput {
    billdate: Date!
    whareid: String!
    custid: String!
    discount: Float
    saletax: Float
    shippingcharges: Float
    totalamount: Float
    cashreceived:Float
    billstatus: String
    paymentstatus: String
    paymentMode: String
    notes: String
    purreturncart: [PurchaseCartItemReturnInput]
  }
  
  input CreateBillQuotationInput {
    billdate: Date!
    whareid: String!
    custid: String!
    discount: Float
    saletax: Float
    shippingcharges: Float
    totalamount: Float
    cashreceived: Float
    billstatus: String
    paymentstatus: String
    paymentMode: String
    notes: String
    ordercart: [ordecartQuotationInput]
  }
  input CreateBillTransferInput {
    billdate: Date!
    whareid: String!
    custid: String!
    discount: Float
    saletax: Float
    shippingcharges: Float
    totalamount: Float
    cashreceived:Float
    billstatus: String
    paymentstatus: String
    paymentMode: String
    notes: String
    transfercart: [TransfercartInput]
  }
  input CreateBillAdjustmentInput {
    billdate: Date!
    whareid: String!
    custid: String
    discount: Float
    saletax: Float
    shippingcharges: Float
    totalamount: Float
    cashreceived:Float
    billstatus: String
    paymentstatus: String
    paymentMode: String
    notes: String
    adjustcart: [AdjustcartInput]
  }
  
  
  type Seller {
    _id: ID!
    sellername: String!
    mobilenumber: String!
    email: String
    shopname: String
    city: String
    country: String
    address: String
    notes: String
    sortby: String
    posid: String
    fbrtoken: String
    createdAt: String
    updatedAt: String
  }
  type ChangePasswordResponse {
    success: Boolean!
    message: String
  }
  type Mutation {
    signupUser(userNew: UserInput!): User
    signupSeller(userNew: UserInput!): User
    signupSubUser(userNew: UserInput!): User
    changePassword(oldPassword: String!, newPassword: String!): ChangePasswordResponse!
    signinUser(userSignin: UserSigninInput): AuthPayload
    addCategory(addNewCategory: AddNewCategoryInput!): Category
    UpdateCategory(id: ID!, name: String!): Category
    DelteCategory(id: ID!): String
    addExpCategory(addNewExpCategory: AddNewExpCategoryInput!): ExpCategory
    UpdateExpCategory(id: ID!, name: String!): ExpCategory
    DelteExpCategory(id: ID!): String
    addWarehouse(addNewWarehouse: AddNewWarehouseInput!): Warehouse
    UpdateWarehouse(id: ID!, name: String!,location: String): Warehouse
    deleteWarehouse(id: ID!): String
    addBrands(addNewBrands: AddNewBrandsInput!): Brand
    UpdateBrands(id: ID, name: String): Brand
    DelteBrands(id: ID): String
    addUnits(addNewUnits: AddNewUnitsInput!): Unit
    UpdateUnits(id: ID, basename: String, name: String): Unit
    DelteUnits(id: ID): String
    addItem(item: AddItemInput!): Item
    updateItem(id: ID!, updatedItem: AddItemInput!): Item
    deleteItem(id: ID!): String
    createBillWaste(CreateWasteSale: CreateBillWasteInput!): BillWasteWithName
    deleteBillWaste(id: ID!): String
    createBillSale(CreateBillSale: CreateBillSaleInput!): BillSaleWithName
    updateBillSale(id: ID!,UpdateBillSale: CreateBillSaleInput!): BillSaleWithName
    updateBillSaleCash(id: ID!,cashReceived: Float!):updateBillSaleCashResponse
    deleteBillSale(id: ID!): String
    createReturnBillSale(CreateReturnBillSale: CreateReturnBillSaleInput!): BillReturnSaleWithName
    updateReturnBillSale(id: ID!,UpdateReturnBillSale: CreateReturnBillSaleInput!): BillReturnSaleWithName
    updateBillSaleReturnCash(id: ID!,cashReceived: Float!):updateBillSaleReturnCashResponse
    deleteReturnBillSale(id: ID!): String
    createBillPurchase(input: CreateBillPurchaseInput!): BillPurchase
    updateBillPurchase(id: ID!, input: CreateBillPurchaseInput!): BillPurchase
    deleteBillPurchase(id: ID!): String
    updateBillPurchaseCash(id: ID!,cashReceived: Float!):UpdateBillPurchaseCashResponse
    createBillPurchaseReturn(input: CreateBillPurchaseReturnInput!): BillPurchaseReturn
    updateBillPurchaseReturn(id: ID!, input: CreateBillPurchaseReturnInput!): BillPurchaseReturn
    updateBillPurchaseReturnCash(id: ID!,cashReceived: Float!):UpdateBillPurchaseReturnCashResponse
    deleteBillPurchaseReturn(id: ID!): String
    createBillQuotation(input: CreateBillQuotationInput!): QuotationBillWithName
    deleteBillQuotation(id: ID!): String
    createBillTransfer(input: CreateBillTransferInput!): TransferBillWithName
    deleteBillTransfer(id: ID!): String
    createBillAdjustment(input: CreateBillAdjustmentInput!): AdjustmentBill
    deleteBillAdjustment(id: ID!): String
    createProject(input: CreateProjectInput!): Project
    deleteProject(id: ID!): String
    deleteTask(id: ID!): String
    createTask(input: CreateTaskInput!): Task
    updateProjectStatus(id: ID!, status: String!): Project
    updateTaskStatus(id: ID!, status: String!): Task
    createExpenseEntry(input: CreateExpenseEntryInput!): ExpenseEntry
    updateExpenseEntry(id: ID!, input: CreateExpenseEntryInput!): ExpenseEntry
    deleteExpenseEntry(id: ID!): String
    createPartyEntry(input: CreatepartyEntryInput!): PartyEntry
    updatePartyEntry(id: ID!, input: UpdatepartyEntryInput!): PartyEntry
    deletePartyEntry(id: ID!): String
    updateSeller(id: ID!, input: UpdateSellerInput!): Seller
    addKitchen(addNewKitchen: AddNewKitchenInput!): Kitchen
    updateKitchen(id: ID!, input: AddNewKitchenInput!): Kitchen
    deleteKitchen(id: ID!): String
    addWaiter(addNewWaiter: AddNewWaiterInput!): Waiter
    updateWaiter(id: ID!, input: AddNewWaiterInput!): Waiter
    deleteWaiter(id: ID!): String
    addTable(addNewTable: AddNewTableInput!): Table
    updateTable(id: ID!, input: AddNewTableInput!): Table
    deleteTable(id: ID!): String
    addRider(addNewRider: AddNewRiderInput!): Rider
    updateRider(id: ID!, input: AddNewRiderInput!): Rider
    deleteRider(id: ID!): String
    addChef(addNewChef: AddNewChefInput!): Chef
    updateChef(id: ID!, input: AddNewChefInput!): Chef
    deleteChef(id: ID!): String
    createProductionItem(input: ProductionInput!): ProductionItem!
    deleteproductionList(id: ID!): String
    createProductionDo(input: ProductionDoInput!): ProductionDoItem
    deleteproductionDo(id: ID!): String
 }

type ProductionDoItem {
  _id: ID!
  formulaName: String
  prodcart: [ProdCartItem!]!
  whareid: ID!
  createdAt: String
  updatedAt: String
}

type ProdCartItem {
  productId: ItemWithName
  qty: Float!
}

input ProductionDoInput {
  formulaName: String
  prodcart: [ProductInput!]!
  whareid: ID!
}

input ProductInput {
  productId: ID!
  qty: Float!
}

 type RawMaterial {
    rawId: ItemWithName!
    qtyUsed: Float!
    cost: Float!
  }

  type ProductionItem {
    _id: ID!
    productId:ItemWithName!
    rawMaterialsUsed: [RawMaterial!]!
    formulaName: String!
    createdAt: String
    updatedAt: String
  }

  input RawMaterialInput {
    rawId: ID!
    qtyUsed: Float!
  }

  input ProductionInput {
    productId: ID!
    rawMaterialsUsed: [RawMaterialInput!]!
    formulaName: String!
  }


  # Define the input type for adding new chefs
input AddNewChefInput {
  name: String!
  commission: Float
  charges: Float
  address: String
  phone: String
  vehicleNumber: String
  homeNumber: String
}

# Define the Chef type
type Chef {
  _id: ID!
  name: String!
  commission: Float
  charges: Float
  address: String
  phone: String
  vehicleNumber: String
  homeNumber: String
  createdAt: String!
}

# Define the response type for the paginated list of chefs
type GetChefsResponse {
  chefs: [Chef]
  chefsCount: Int
}
  # Define the input type for adding new riders
input AddNewRiderInput {
  name: String!
  commission: Float
  charges: Float
  address: String
  phone: String
  vehicleNumber: String
  homeNumber: String
}

# Define the Rider type
type Rider {
  _id: ID!
  name: String!
  commission: Float
  charges: Float
  address: String
  phone: String
  vehicleNumber: String
  homeNumber: String
  createdAt: String!
}

# Define the response type for the paginated list of riders
type GetRidersResponse {
  riders: [Rider]
  ridersCount: Int
}
  type updateBillSaleCashResponse {
    message: String!
  }
  type updateBillSaleReturnCashResponse {
    message: String!
  }
  type UpdateBillPurchaseReturnCashResponse {
    message: String!
  }
  type UpdateBillPurchaseCashResponse {
    message: String!
  }
  input UpdateSellerInput {
    sellername: String
    mobilenumber: String
    email: String
    shopname: String
    city: String
    country: String
    address: String
    sortby: String
    posid: String
    fbrtoken: String
    notes: String
  }
  input CreatepartyEntryInput {
    name: String!
    email: String
    phoneNumber: String
    country: String
    city: String
    address: String
    acctype: String
    partytype: Boolean
  
  }
  input UpdatepartyEntryInput {
    name: String!
    email: String
    phoneNumber: String
    country: String
    city: String
    address: String
    acctype: String
    partytype: Boolean
  
  }
input CreateTaskInput {
  title: String!
  description: String
  dueDate: Date!
  status: String
  projectId: ID!
  userid: ID
}
  input UpdateTaskInput {
    taskId: ID!
    title: String
    description: String
    dueDate: Date
    status: String
    userid: ID
  }
  input UpdateProjectInput {
    projectId: ID!
    title: String
    description: String
    startDate: Date
    endDate: Date
    status: String
  }
  input CreateProjectInput {
    title: String!
    description: String
    startDate: Date!
    endDate: Date
    status: String
  }
  
  input UserInput {
    name: String!
    mobileno: String!
    password: String!
    verified: Boolean
  }

  input UserSigninInput {
    mobileno: String!
    password: String!
  }

  input AddNewCategoryInput {
    name: String!
  }
  input AddNewExpCategoryInput {
    name: String!
  }
  input AddNewWarehouseInput {
    name: String!
    location: String
  }

  input AddNewBrandsInput {
    name: String!
  }

  input AddNewUnitsInput {
    name: String!
    basename: String!
  }

  input AddItemInput {
    productname: String!
    brandid: String
    cateid: String
    unitid: String
    barcode: [String]
    cost: String
    price: String
    wsprice: String
    discount: String
    alertqty: String
    stockqty: String
    whareid: String
    tax: String
    ordernote: String
  }
 input WasteCartItemInput {
    id: ID
    name: String
    price: Float
    quantity: Float
    discount: Float
    tax: Float
   
  }
  input SaleCartItemInput {
    id: ID
    name: String
    price: Float
    quantity: Float
    discount: Float
    tax: Float
    kotqty: Float
  }

  input CreateBillSaleInput {
  billdate: String!
  whareid: ID!
  custid: ID!
  discount: Float
  saletax: Float
  shippingcharges: Float
  totalamount: Float
  billstatus: String
  paymentstatus: String
  paymentMode: String
  cashreceived: Float
  receivedamount: Float
  notes: String
  invoiceNumberfbr: String
  salecart: [SaleCartItemInput!]!
  customerName: String
  mobileNumber: String
  deliveryAddress: String
  riderName: String
  riderid: String
  waiterName: String
  waiterid: String
  tableName: String
  tabileid: String
  chefid: String
  orderType: String
  kitchenid: ID

}


    
  input CreateBillWasteInput {
    billdate: Date!
    whareid: String!
    custid: String!
    discount: Float
    saletax: Float
    shippingcharges: Float
    cashreceived:Float
    receivedamount:Float
    totalamount: Float
    billstatus: String
    paymentstatus: String
    paymentMode: String
    notes: String
    customerName: String
    mobileNumber: String
    deliveryAddress: String
    invoiceNumberfbr: String
    riderName: String
    riderid: String
    waiterName: String
    waiterid: String
    tableName: String
    tabileid: String
    chefid: String
    orderType: String
    kitchenid: String
    wastecart: [WasteCartItemInput]
  }
  input CreateReturnBillSaleInput {
    billdate: Date!
    whareid: String!
    custid: String!
    discount: Float
    saletax: Float
    shippingcharges: Float
    totalamount: Float
    cashreceived:Float
    billstatus: String
    paymentstatus: String
    paymentMode: String
    notes: String
    returncart: [SaleReturnCartItemInput]
  }
  input SaleReturnCartItemInput {
    id: ID
    name: String
    price: Float
    quantity: Float
    discount: Float
    tax: Float
  }
`;

export default typeDefs;
