import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import './models/TaskModel.js'
import './models/userModel.js'
import './models/categoryModel.js'
import './models/brandsModel.js'
import './models/unitsModel.js'
import './models/itemsModel.js'
import './models/billSaleModel.js'
import './models/billSaleReturnModel.js'
import './models/ProjectModel.js'
import './models/billPurchaseModel.js'
import './models/billPurchaseReturnModel.js'
import './models/warehouseModel.js'
import './models/expensecategoryModel.js'
import './models/expenseEntryModel.js'
import './models/partyEntryModel.js'
import './models/sellerModel.js'
import './models/billOrdersModel.js'
import './models/billAdjustmentsModel.js'
import './models/billTransfersModel.js'
import './models/stockModel.js'
import './models/kitchenModel.js';
import  './models/waiterModel.js';
import  './models/chefModel.js';
import './models/riderModel.js';
import './models/tableModel.js';
import billWasteModel from './models/billWasteModel.js';
import productionListModel from './models/productionListModel.js';
import productionModel from './models/productionModel.js';
import expenseEntryModel from './models/expenseEntryModel.js';



const userModel = mongoose.model("userModel");
const categoryModel = mongoose.model("categoryModel");
const brandsModel = mongoose.model("brandsModel");
const unitsModel = mongoose.model("unitsModel");
const itemsModel = mongoose.model("itemsModel");
const billSaleModel = mongoose.model("billSaleModel");
const billSaleReturnModel = mongoose.model("billSaleReturnModel");
const ProjectModel = mongoose.model("projectModel");
const TaskModel = mongoose.model("taskModel");
const billPurchaseModel = mongoose.model("billPurchaseModel");
const billPurchaseReturnModel = mongoose.model("billPurchaseReturnModel");
const warehouseModel = mongoose.model("warehouseModel");
const expensecategoryModel = mongoose.model("expensecategoryModel");
const ExpenseEntryModel = mongoose.model("expenseEntryModel");
const partyEntryModel = mongoose.model("partyEntryModel");
const sellerModel = mongoose.model("sellerModel");
const billAdjustmentsModel = mongoose.model("billAdjustmentsModel");
const billOrdersModel = mongoose.model("billOrdersModel");
const billTransfersModel = mongoose.model("billTransfersModel");
const stockModel = mongoose.model("stockModel");
const kitchenModel = mongoose.model("kitchenModel");
const chefModel = mongoose.model("chefModel");
const riderModel = mongoose.model("riderModel");
const waiterModel = mongoose.model("waiterModel");
const tableModel = mongoose.model("tableModel");

const resolvers = {
  Query: {

    getWarehouse: async (_, args, context) => {
      const { userId, sellerId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = {};
        if (args.search) {
          const search = new RegExp(
            args.search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c),
            'i'
          );
          query = { name: search, sellerid: sellerId };
        } else {
          query = { sellerid: sellerId };
        }

        const warehouse = await warehouseModel
          .find(query)
          .sort({ createdAt: -1 })
          .skip((args.page - 1) * args.rows)
          .limit(args.rows || 10);

        const warehousecount = await warehouseModel.countDocuments(query) || 0;

        return {
          warehouse: warehouse.map((category) => ({
            ...category._doc,
            createdAt: category.createdAt.toISOString(),
          })),
          warehousecount: warehousecount,
        };
      } catch (err) {
        throw err;
      }
    },
    Warehousebyid: async (_, { id }, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You Must Be Login with Mobile number');
        }
        const warehouse = await warehouseModel.findById(id);

        // Return the category as an array or null if not found
        return warehouse;
        // const category = await categoryModel.findById({_id:id })
        // return category;
      } catch (error) {
        throw new Error(`Error fetching category: ${error.message}`);
      }
    },
    categorybyid: async (_, { id }, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You Must Be Login with Mobile number');
        }
        const category = await categoryModel.findById(id);

        // Return the category as an array or null if not found
        return category;
        // const category = await categoryModel.findById({_id:id })
        // return category;
      } catch (error) {
        throw new Error(`Error fetching category: ${error.message}`);
      }
    },
    getCategory: async (_, args, context) => {
      const { userId, sellerId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = {};
        if (args.search) {
          const search = new RegExp(
            args.search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c),
            'i'
          );
          query = { name: search, sellerid: sellerId };
        } else {
          query = { sellerid: sellerId };
        }
        let sortOption = { createdAt: -1 }; // Default sort by createdAt descending
        if (args.sortby) {
          const sortBy = args.sortby.toLowerCase();
        
          if (sortBy === 'createdat_asc') {
            sortOption = { createdAt: 1 }; // Sort by createdAt ascending
          } else if ( sortBy === 'createdat_desc') {
            sortOption = { createdAt: -1 }; // Sort by createdAt descending
          } else if (sortBy === 'price_asc') {
            sortOption = { price: 1 }; // Sort by price ascending
          } else if (sortBy === 'price_desc') {
            sortOption = { price: -1 }; // Sort by price descending
          }
          // Add more conditions for other sortable fields as needed
        }
        
        const categories = await categoryModel
          .find(query)
          .sort(sortOption)
          .skip((args.page - 1) * args.rows)
          .limit(args.rows);

        const categoryCount = await categoryModel.countDocuments(query);

        return {
          categories: categories.map((category) => ({
            ...category._doc,
            createdAt: category.createdAt.toISOString(),
          })),
          categoryCount: categoryCount,
        };
      } catch (err) {
        throw err;
      }
    },
    Expcategorybyid: async (_, { id }, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You Must Be Login with Mobile number');
        }
        const category = await expensecategoryModel.findById(id);

        // Return the category as an array or null if not found
        return category;
        // const category = await categoryModel.findById({_id:id })
        // return category;
      } catch (error) {
        throw new Error(`Error fetching category: ${error.message}`);
      }
    },
    getExpcategory: async (_, args, context) => {
      const { userId, sellerId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = {};
        if (args.search) {
          const search = new RegExp(
            args.search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c),
            'i'
          );
          query = { name: search, sellerid: sellerId };
        } else {
          query = { sellerid: sellerId };
        }

        const expcategories = await expensecategoryModel
          .find(query)
          .sort({ createdAt: -1 })
          .skip((args.page - 1) * args.rows)
          .limit(args.rows);

        const expcategoryCount = await expensecategoryModel.countDocuments(query);

        return {
          expcategories: expcategories.map((expcategory) => ({
            ...expcategory._doc,
            createdAt: expcategory.createdAt.toISOString(),
          })),
          expcategoryCount: expcategoryCount,
        };
      } catch (err) {
        throw err;
      }
    },
    getProjectById: async (_, { id }, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You Must Be Login with Mobile number');
        }
        const project = await ProjectModel.findById(id);

        // Return the category as an array or null if not found
        return project;
        // const category = await categoryModel.findById({_id:id })
        // return category;
      } catch (error) {
        throw new Error(`Error fetching Project: ${error.message}`);
      }
    },
    getProject: async (_, args, context) => {
      const { userId, sellerId } = context;

      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = {};
        if (args.search) {
          const search = new RegExp(
            args.search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c),
            'i'
          );
          query = { title: search, sellerid: sellerId };
        } else {
          query = { sellerid: sellerId };
        }

        const projects = await ProjectModel
          .find(query)
          .sort({ createdAt: -1 })
          .skip((args.page - 1) * args.rows)
          .limit(args.rows);

        const projectcount = await ProjectModel.countDocuments(query) || 0;

        return {
          project: projects.map((category) => ({
            ...category._doc,
            createdAt: category.createdAt.toISOString(),
          })),
          projectcount: projectcount,
        };
      } catch (err) {
        throw err;
      }
    },
    getTaskById: async (_, { id }, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You Must Be Login with Mobile number');
        }
        const task = await TaskModel.findById(id);

        // Return the category as an array or null if not found
        return task;
        // const category = await categoryModel.findById({_id:id })
        // return category;
      } catch (error) {
        throw new Error(`Error fetching Task: ${error.message}`);
      }
    },
    getTask: async (_, args, context) => {
      const { userId, sellerId } = context;

      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = {};
        if (args.search) {
          const search = new RegExp(
            args.search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c),
            'i'
          );
          query = { title: search, sellerid: sellerId };
        } else {
          query = { sellerid: sellerId };
        }

        const tasks = await TaskModel.find(query)
          .sort({ createdAt: -1 })
          .skip((args.page - 1) * args.rows)
          .limit(args.rows || 10);

        const taskCount = await TaskModel.countDocuments(query) || 0;

        return {
          tasks: tasks.map((task) => ({
            ...task._doc,
            createdAt: task.createdAt.toISOString(),
          })),
          taskscount: taskCount,
        };
      } catch (err) {
        throw new Error(`Error fetching tasks: ${err.message}`);
      }
    },
    brandsbyid: async (_, { id }, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You Must Be Login with Mobile number');
        }
        const brands = await brandsModel.findById(id);

        // Return the category as an array or null if not found
        return brands;
        // const category = await categoryModel.findById({_id:id })
        // return category;
      } catch (error) {
        throw new Error(`Error fetching category: ${error.message}`);
      }
    },
    getBrands: async (_, args, context) => {
      const { userId, sellerId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = {};
        if (args.search) {
          const search = new RegExp(
            args.search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c),
            'i'
          );
          query = { name: search, sellerid: sellerId };
        } else {
          query = { sellerid: sellerId };
        }

        const brands = await brandsModel
          .find(query)
          .sort({ createdAt: -1 })
          .skip((args.page - 1) * args.rows)
          .limit(args.rows);

        const brandsCount = await brandsModel.countDocuments(query);

        return {
          brands: brands.map((brand) => ({
            ...brand._doc,
            createdAt: brand.createdAt.toISOString(),
          })),
          brandsCount: brandsCount,
        };
      } catch (err) {
        throw err;
      }
    },
    unitsbyid: async (_, { id }, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You Must Be Login with Mobile number');
        }
        const units = await unitsModel.findById(id);

        // Return the category as an array or null if not found
        return units;
        // const category = await categoryModel.findById({_id:id })
        // return category;
      } catch (error) {
        throw new Error(`Error fetching category: ${error.message}`);
      }
    },
    getUnits: async (_, args, context) => {
      const { userId, sellerId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = {};
        if (args.search) {
          const search = new RegExp(
            args.search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c),
            'i'
          );
          query = { name: search, sellerid: sellerId };
        } else {
          query = { sellerid: sellerId };
        }

        const units = await unitsModel
          .find(query)
          .sort({ createdAt: -1 })
          .skip((args.page - 1) * args.rows)
          .limit(args.rows);

        const unitsCount = await unitsModel.countDocuments(query);

        return {
          units: units.map((unit) => ({
            ...unit._doc,
            createdAt: unit.createdAt.toISOString(),
          })),
          unitsCount: unitsCount,
        };
      } catch (err) {
        throw err;
      }
    },
    itemById: async (_, { id }, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You Must Be Login with Mobile number');
        }
        const items = await itemsModel.findById(id).populate('brandid', '_id name ')
          .populate('cateid', '_id name ')
          .populate('unitid', '_id name ');

        // Return the category as an array or null if not found
        return items;
        // const category = await categoryModel.findById({_id:id })
        // return category;
      } catch (error) {
        throw new Error(`Error fetching category: ${error.message}`);
      }
    },
    getItems: async (_, args, context) => {
      const { userId, sellerId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = {};
        if (args.search) {
          const search = new RegExp(
            args.search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c),
            'i'
          );
          query = { productname: search, sellerid: sellerId };
        } else {
          query = { sellerid: sellerId };
        }
        if (args.cateid) {
          query.cateid = args.cateid;
        }
        let sortOption = { createdAt: -1 }; // Default sort by createdAt descending
        if (args.sortby) {
          const sortBy = args.sortby;
        
          if (sortBy === 'createdat_asc') {
            sortOption = { createdAt: 1 }; // Sort by createdAt ascending
          } else if ( sortBy === 'createdat_desc') {
            sortOption = { createdAt: -1 }; // Sort by createdAt descending
          } else if (sortBy === 'price_asc') {
            sortOption = { price: 1 }; // Sort by price ascending
          } else if (sortBy === 'price_desc') {
            sortOption = { price: -1 }; // Sort by price descending
          }
          // Add more conditions for other sortable fields as needed
        }
        
        const items = await itemsModel
          .find(query)
          .populate('brandid', '_id name ')
          .populate('cateid', '_id name ')
          .populate('unitid', '_id name ')
          .sort(sortOption)
          .skip((args.page - 1) * args.rows)
          .limit(args.rows || 10);

        const itemCount = await itemsModel.countDocuments(query);

        return {
          items: items.map((item) => ({
            ...item._doc,
            createdAt: item.createdAt.toISOString(),
          })),
          itemCount: itemCount,
        };
      } catch (err) {
        throw err;
      }
    },
    getSaleBill: async (_, args, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }
    
        // Initialize query with userId
        let query = { userid: userId };
    
        // Add search term if provided
        if (args.search) {
          const search = new RegExp(
            args.search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c),
            'i'
          );
          query.custid = search;
        }
    
        // Add whareid filter if provided
        if (args.whareid) {
          query.whareid = args.whareid;
        }
    
        // Add billstatus filter if provided
        if (args.billstatus) {
          query.billstatus = args.billstatus;
        }
    
        // Fetch sale bills with the constructed query
        const saleBills = await billSaleModel
          .find(query)
          .populate('whareid', '_id name')
          .populate('custid', '_id name')
          .sort({ createdAt: -1 })
          .skip((args.page - 1) * args.rows)
          .limit(args.rows);
    
        // Count total documents matching the query
        const saleBillCount = await billSaleModel.countDocuments(query);
    
        return {
          saleBills: saleBills.map((saleBill) => ({
            ...saleBill._doc,
           
          })),
          saleBillCount: saleBillCount,
        };
      } catch (err) {
        throw err;
      }
    },
    getWasteBill: async (_, args, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = {};
        if (args.search) {
          const search = new RegExp(
            args.search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c),
            'i'
          );
          query = {  userid: userId };
        } else {
          query = { userid: userId };
        }

        const wastebills = await billWasteModel
          .find(query)
          .populate('whareid', '_id name ')
          .sort({ createdAt: -1 })
          .skip((args.page - 1) * args.rows)
          .limit(args.rows);

        const wasteBillCount = await billWasteModel.countDocuments(query)||0;

        return {
          wasteBills: wastebills.map((wasteBills) => ({
            ...wasteBills._doc,
            createdAt: wasteBills.createdAt.toISOString(),
          })),
          wasteBillCount: wasteBillCount,
        };
      } catch (err) {
        throw err;
      }
    },
    saleBillById: async (_, { id }, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number');
        }

        // Assuming `billSaleModel` is your mongoose model for sale bills
        const items = await billSaleModel.findById(id)
          .populate('whareid', '_id name')
          .populate('custid', '_id name');

        // Return the sale bill with populated fields
        return items;
      } catch (error) {
        throw new Error(`Error fetching sale bill: ${error.message}`);
      }
    },
    getSaleReturnBill: async (_, args, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = {};
        if (args.search) {
          const search = new RegExp(
            args.search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c),
            'i'
          );
          query = { custid: search, userid: userId };
        } else {
          query = { userid: userId };
        }

        const saleReturnBills = await billSaleReturnModel
          .find(query)
          .populate('whareid', '_id name ')
          .populate('custid', '_id name ')
          .sort({ createdAt: -1 })
          .skip((args.page - 1) * args.rows)
          .limit(args.rows);

        const saleReturnBillCount = await billSaleReturnModel.countDocuments(query);

        return {
          saleReturnBills: saleReturnBills.map((saleReturnBill) => ({
            ...saleReturnBill._doc,
            createdAt: saleReturnBill.createdAt.toISOString(),
          })),
          saleReturnBillCount: saleReturnBillCount,
        };
      } catch (err) {
        throw err;
      }
    },
    saleReturnBillById: async (_, { id }, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You Must Be Login with Mobile number');
        }
        const items = await billSaleReturnModel.findById(id)
          .populate('whareid', '_id name')
          .populate('custid', '_id name');

        // Return the category as an array or null if not found
        return items;
        // const category = await categoryModel.findById({_id:id })
        // return category;
      } catch (error) {
        throw new Error(`Error fetching category: ${error.message}`);
      }
    },
    getPurchanseBill: async (_, args, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = {};
        if (args.search) {
          const search = new RegExp(
            args.search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c),
            'i'
          );
          query = { custid: search, userid: userId };
        } else {
          query = { userid: userId };
        }

        const billPurchase = await billPurchaseModel
          .find(query)
          .populate('whareid', '_id name ')
          .populate('custid', '_id name ')
          .sort({ createdAt: -1 })
          .skip((args.page - 1) * args.rows)
          .limit(args.rows);

        const billPurchaseCount = await billPurchaseModel.countDocuments(query);

        return {
          billPurchase: billPurchase.map((billPurchase) => ({
            ...billPurchase._doc,
            createdAt: billPurchase.createdAt.toISOString(),
          })),
          billPurchaseCount: billPurchaseCount,
        };
      } catch (err) {
        throw err;
      }
    },
    billPurchaseById: async (_, { id }, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You Must Be Login with Mobile number');
        }
        const item = await billPurchaseModel.findById(id).populate('whareid', '_id name')
          .populate('custid', '_id name');

        return item;
      } catch (error) {
        throw new Error(`Error fetching bill purchase: ${error.message}`);
      }
    },
    getPurchaseReturnBill: async (_, args, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = {};
        if (args.search) {
          const search = new RegExp(
            args.search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c),
            'i'
          );
          query = { custid: search, userid: userId };
        } else {
          query = { userid: userId };
        }

        const billPurchaseReturn = await billPurchaseReturnModel
          .find(query)
          .populate('whareid', '_id name ')
          .populate('custid', '_id name ')
          .sort({ createdAt: -1 })
          .skip((args.page - 1) * args.rows)
          .limit(args.rows);

        const billPurchaseReturnCount = await billPurchaseReturnModel.countDocuments(query);

        return {
          billPurchaseReturn: billPurchaseReturn.map((billPurchaseReturn) => ({
            ...billPurchaseReturn._doc,
            createdAt: billPurchaseReturn.createdAt.toISOString(),
          })),
          billPurchaseReturnCount: billPurchaseReturnCount,
        };
      } catch (err) {
        throw err;
      }
    },
    billPurchaseReturnById: async (_, { id }, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You Must Be Login with Mobile number');
        }
        const item = await billPurchaseReturnModel.findById(id).populate('whareid', '_id name')
          .populate('custid', '_id name');

        return item;
      } catch (error) {
        throw new Error(`Error fetching bill purchase: ${error.message}`);
      }
    },
    getquotationBill: async (_, args, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = {};
        if (args.search) {
          const search = new RegExp(
            args.search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c),
            'i'
          );
          query = { custid: search, userid: userId };
        } else {
          query = { userid: userId };
        }

        const billquotation = await billOrdersModel
          .find(query)
          .populate('whareid', '_id name')
          .populate('custid', '_id name')
          .sort({ createdAt: -1 })
          .skip((args.page - 1) * args.rows)
          .limit(args.rows || 10);

        const billquotationCount = await billOrdersModel.countDocuments(query);

        return {
          billquotation: billquotation.map((billquotation) => ({
            ...billquotation._doc,
            createdAt: billquotation.createdAt.toISOString(),
          })),
          billquotationCount: billquotationCount,
        };
      } catch (err) {
        throw err;
      }
    },
    getProductionBills: async (_, args, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in.');
        }
    
        // Find the product by name to get its ID
        let productIds = [];
        if (args.search) {
          const search = new RegExp(args.search.replace(/[\\\[\]()+?.*]/g, '\\$&'), 'i');
          const products = await itemsModel.find({ productname: search });
          productIds = products.map(product => product._id);
        }
    
        // Create the query for production bills
        let query = { userid: userId };
        if (productIds.length > 0) {
          query = {
            ...query,
            productId: { $in: productIds }
          };
        }
    
        const productionList = await productionListModel
          .find(query)
          .populate('productId', '_id productname') // Populate the productId field with name
          .populate({
            path: 'rawMaterialsUsed.rawId',
            select: '_id productname cost',
          })
          .sort({ createdAt: -1 })
          .skip((args.page - 1) * args.rows)
          .limit(args.rows || 10);
    
        const totalCount = await productionListModel.countDocuments(query);
    
        return {
          productionBill: productionList.map((item) => ({
            ...item._doc,
            createdAt: item.createdAt.toISOString(),
            updatedAt: item.updatedAt.toISOString(),
          })),
          totalCount,
        };
      } catch (err) {
        console.error("Error fetching production bills:", err);
        throw new Error(`Error fetching production bills: ${err.message}`);
      }
    },   
    getProductionDoBills: async (_, args, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in.');
        }
    
        let productIds = [];
        if (args.search) {
          const search = new RegExp(args.search.replace(/[\\\[\]()+?.*]/g, '\\$&'), 'i');
          const products = await itemsModel.find({ productname: search });
          productIds = products.map(product => product._id);
        }
    
        let query = { userid: userId };
        if (productIds.length > 0) {
          query = {
            ...query,
            'prodcart.productId': { $in: productIds }
          };
        }
    
        const productionList = await productionModel
          .find(query)
          .populate({
            path: 'prodcart.productId',
            select: '_id productname'
          })
          .sort({ createdAt: -1 })
          .skip((args.page - 1) * args.rows)
          .limit(args.rows || 10);
    
        const totalCount = await productionModel.countDocuments(query);
    
        return {
          productionBill: productionList.map((item) => ({
            ...item._doc,
            createdAt: item.createdAt.toISOString(),
            updatedAt: item.updatedAt.toISOString(),
          })),
          totalCount,
        };
      } catch (err) {
        console.error("Error fetching production bills:", err);
        throw new Error(`Error fetching production bills: ${err.message}`);
      }
    }, 
    getAdjustmentBill: async (_, args, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = {};
        if (args.search) {
          const search = new RegExp(
            args.search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c),
            'i'
          );
          query = { custid: search, userid: userId };
        } else {
          query = { userid: userId };
        }

        const billadjustment = await billAdjustmentsModel
          .find(query)
          .populate('whareid', '_id name')
          .sort({ createdAt: -1 })
          .skip((args.page - 1) * args.rows)
          .limit(args.rows);

        const billadjustmentCount = await billAdjustmentsModel.countDocuments(query);

        return {
          billadjustment: billadjustment.map((billadjustment) => ({
            ...billadjustment._doc,
            createdAt: billadjustment.createdAt.toISOString(),
          })),
          billadjustmentCount: billadjustmentCount,
        };
      } catch (err) {
        throw err;
      }
    },
    getTransferBill: async (_, args, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = {};
        if (args.search) {
          const search = new RegExp(
            args.search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c),
            'i'
          );
          query = { custid: search, userid: userId };
        } else {
          query = { userid: userId };
        }

        const billtransfer = await billTransfersModel
          .find(query)
          .populate('whareid', '_id name')
          .populate('custid', '_id name')
          .sort({ createdAt: -1 })
          .skip((args.page - 1) * args.rows)
          .limit(args.rows);

        const billtransferCount = await billTransfersModel.countDocuments(query);

        return {
          billtransfer: billtransfer.map((billtransfer) => ({
            ...billtransfer._doc,
            createdAt: billtransfer.createdAt.toISOString(),
          })),
          billtransferCount: billtransferCount,
        };
      } catch (err) {
        throw err;
      }
    },
    getTasksByProjectId: async (_, { projectid }, context) => {
      const { userId } = context;

      if (!userId) {
        throw new Error('You must be logged in.');
      }
      try {
        const tasks = await TaskModel.find({ projectid });
        return tasks;
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
        throw new Error("Failed to fetch tasks");
      }
    },
    getExpenseEntryById: async (_, { id }, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }
        const expenseEntry = await ExpenseEntryModel.findById(id).populate('wareid', '_id name')
          .populate('cateid', '_id name');

        return expenseEntry;
      } catch (error) {
        throw new Error(`Error fetching expense entry: ${error.message}`);
      }
    },
    getExpenseEntries: async (_, args, context) => {
      const { userId,sellerId} = context;

      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = { userid: userId }; // Default query for fetching user's expense entries
        if (args.search) {
          const search = new RegExp(
            args.search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c),
            'i'
          );
          query.cateid = search; // Add title search to the query
        }

        const expenseEntries = await ExpenseEntryModel
          .find(query)
          .populate('wareid', '_id name ')
          .populate('cateid', '_id name ')
          .sort({ createdAt: -1 })
          .skip((args.page - 1) * args.rows)
          .limit(args.rows || 10);

        const expenseEntryCount = await ExpenseEntryModel.countDocuments(query) || 0;

        return {
          expenseEntries: expenseEntries.map((entry) => ({
            ...entry._doc,
            date: entry.date.toISOString(),
          })),
          expenseEntryCount: expenseEntryCount,
        };
      } catch (err) {
        throw err;
      }
    },
    getPartyEntryById: async (_, { id }, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }
        const partyEntry = await partyEntryModel.findById(id);
        return partyEntry;
      } catch (error) {
        throw new Error(`Error fetching party entry: ${error.message}`);
      }
    },
    getPartyEntry: async (_, { page, rows, search, acctype }, context) => {
      const { userId, sellerId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = { sellerid: sellerId };
        if (search) {
          const searchRegex = new RegExp(
            search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c),
            'i'
          );
          query.phoneNumber = searchRegex; // Update to use name field for search
        }

        if (acctype) {
          query.acctype = acctype; // Include acctype in the query if provided
        }

        const PartyEntry = await partyEntryModel
          .find(query)
          .sort({ createdAt: -1 })
          .skip((page - 1) * rows)
          .limit(rows);

        const partyEntryCount = await partyEntryModel.countDocuments(query);

        return {
          PartyEntry: PartyEntry.map((entry) => ({
            ...entry._doc,
            // Format any date fields here if needed
          })),
          PartyEntryCount: partyEntryCount,
        };
      } catch (error) {
        throw error;
      }
    },
    getSellerById: async (_, args, context) => {
      const { userId, sellerId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        const seller = await sellerModel.findById(sellerId);
        return seller;
      } catch (error) {
        throw new Error(`Error fetching seller: ${error.message}`);
      }
    },
    getUserById: async (_, args, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        // Find the user by userId
        const user = await userModel.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }

        // Extract sellerid from the user
        const { sellerid } = user;

        // Find all users associated with the sellerid
        const users = await userModel.find({ sellerid });

        // Return the array of users
        return users;
      } catch (error) {
        // Log the error for debugging purposes
        console.error(error);

        // Throw an error with a more specific message
        throw new Error('Error fetching user details: ' + error.message);
      }
    },
    kitchenById: async (_, { id }, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }
        const kitchen = await kitchenModel.findById(id);

        if (!kitchen) {
          throw new Error('Kitchen not found');
        }

        return kitchen;
      } catch (error) {
        throw new Error(`Error fetching kitchen: ${error.message}`);
      }
    },
    getKitchens: async (_, { search, page, rows }, context) => {
      const { userId, sellerId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = { sellerid: sellerId };

        if (search) {
          const searchRegex = new RegExp(search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c), 'i');
          query.name = searchRegex;
        }

        const kitchens = await kitchenModel
          .find(query)
          .sort({ createdAt: -1 })
          .skip((page - 1) * rows)
          .limit(rows);

        const kitchensCount = await kitchenModel.countDocuments(query);

        return {
          kitchens: kitchens.map((kitchen) => ({
            ...kitchen._doc,
            createdAt: kitchen.createdAt.toISOString(),
          })),
          kitchensCount,
        };
      } catch (error) {
        throw new Error(`Error fetching kitchens: ${error.message}`);
      }
    },
    waiterById: async (_, { id }, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }
        const waiter = await waiterModel.findById(id);

        if (!waiter) {
          throw new Error('Waiter not found');
        }

        return waiter;
      } catch (error) {
        throw new Error(`Error fetching waiter: ${error.message}`);
      }
    },
    getWaiters: async (_, { search, page, rows }, context) => {
      const { userId, sellerId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = { sellerid: sellerId };

        if (search) {
          const searchRegex = new RegExp(search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c), 'i');
          query.name = searchRegex;
        }

        const waiters = await waiterModel
          .find(query)
          .sort({ createdAt: -1 })
          .skip((page - 1) * rows)
          .limit(rows);

        const waitersCount = await waiterModel.countDocuments(query);

        return {
          waiters: waiters.map((waiter) => ({
            ...waiter._doc,
            createdAt: waiter.createdAt.toISOString(),
          })),
          waitersCount,
        };
      } catch (error) {
        throw new Error(`Error fetching waiters: ${error.message}`);
      }
    },
    tableById: async (_, { id }, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }
        const table = await tableModel.findById(id);

        if (!table) {
          throw new Error('Table not found');
        }

        return table;
      } catch (error) {
        throw new Error(`Error fetching table: ${error.message}`);
      }
    },
    getTables: async (_, { search, page, rows }, context) => {
      const { userId, sellerId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = { sellerid: sellerId , reserved: false};

        if (search) {
          const searchRegex = new RegExp(search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c), 'i');
          query.name = searchRegex;
        }

        const tables = await tableModel
          .find(query)
          .sort({ createdAt: -1 })
          .skip((page - 1) * rows)
          .limit(rows);

        const tablesCount = await tableModel.countDocuments(query);

        return {
          tables: tables.map((table) => ({
            ...table._doc,
            createdAt: table.createdAt.toISOString(),
          })),
          tablesCount,
        };
      } catch (error) {
        throw new Error(`Error fetching tables: ${error.message}`);
      }
    },
    riderById: async (_, { id }, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }
        const rider = await riderModel.findById(id);

        if (!rider) {
          throw new Error('Rider not found');
        }

        return rider;
      } catch (error) {
        throw new Error(`Error fetching rider: ${error.message}`);
      }
    },
    getRiders: async (_, { search, page, rows }, context) => {
      const { userId, sellerId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = { sellerid: sellerId };

        if (search) {
          const searchRegex = new RegExp(search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c), 'i');
          query.name = searchRegex;
        }

        const riders = await riderModel
          .find(query)
          .sort({ createdAt: -1 })
          .skip((page - 1) * rows)
          .limit(rows);

        const ridersCount = await riderModel.countDocuments(query);

        return {
          riders: riders.map((rider) => ({
            ...rider._doc,
            createdAt: rider.createdAt.toISOString(),
          })),
          ridersCount,
        };
      } catch (error) {
        throw new Error(`Error fetching riders: ${error.message}`);
      }
    },
    chefById: async (_, { id }, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }
        const chef = await chefModel.findById(id);

        if (!chef) {
          throw new Error('Chef not found');
        }

        return chef;
      } catch (error) {
        throw new Error(`Error fetching chef: ${error.message}`);
      }
    },
    getChefs: async (_, { search, page, rows }, context) => {
      const { userId, sellerId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = { sellerid: sellerId };

        if (search) {
          const searchRegex = new RegExp(search.replace(/[\\\[\]()+?.*]/g, (c) => '\\' + c), 'i');
          query.name = searchRegex;
        }

        const chefs = await chefModel
          .find(query)
          .sort({ createdAt: -1 })
          .skip((page - 1) * rows)
          .limit(rows);

        const chefsCount = await chefModel.countDocuments(query);

        return {
          chefs: chefs.map((chef) => ({
            ...chef._doc,
            createdAt: chef.createdAt.toISOString(),
          })),
          chefsCount,
        };
      } catch (error) {
        throw new Error(`Error fetching chefs: ${error.message}`);
      }
    },

    //reports 
    //sale reports
    ReportgetsaleBills: async (_, { warehouseId, customerId, userIds, paymentStatus, startDate, endDate, page }, context) => {
          const { userId, sellerId } = context;
    
          try {
            if (!userId) {
              throw new Error('You must be logged in with a mobile number.');
            }
    
            // Convert startDate and endDate to Date objects
            const start = new Date(startDate);
            const end = new Date(endDate);
            
            let query = { 
              sellerid: sellerId, 
              billdate: { $gte: start, $lte: end } 
            };
    
            if (customerId) {
              query.custid = customerId;
            }
            if (warehouseId) {
              query.whareid = warehouseId;
            }
            if (userIds && userIds.length > 0) {
              query.userid = { $in: userIds };
            }
            if (paymentStatus) {
              query.paymentstatus = paymentStatus;
            }
    
            const totalCount = await billSaleModel.countDocuments(query);
    
            const bills = await billSaleModel
              .find(query)
              .populate('whareid', '_id name')
              .populate('custid', '_id name')
              .sort({ createdAt: -1 })
              .skip((page - 1) * 10)
              .limit(10);
    
            return {
              bills: bills.map(bill => ({
                ...bill._doc,
              })),
              totalCount: totalCount,
            };
          } catch (error) {
            throw new Error('Error fetching bills: ' + error.message);
          }
    },
    // ReportTodaySalesBetween: async (_, { warehouseId, customerId, userIds, paymentStatus,startDate, endDate }, context) => {
    //       try {
    //         const { sellerId } = context;
            
    //         const startOfDay = new Date(startDate);
    //         startOfDay.setUTCHours(0, 0, 0, 0); 
    
    //         const endOfDay = new Date(endDate);
    //         endOfDay.setUTCHours(23, 59, 59, 999); 
            
    //         const salesBetweenDates = await billSaleModel.aggregate([
    //           {
    //             $match: {
    //               sellerid: new mongoose.Types.ObjectId(sellerId),
    //               billdate: {
    //                 $gte: startOfDay, 
    //                 $lte: endOfDay 
    //               }
    //             }
    //           },
    //           {
    //             $group: {
    //               _id: null,
    //               totalSales: { $sum: "$totalamount" }
    //             }
    //           }
    //         ]);
            
    //         return salesBetweenDates.length > 0 ? salesBetweenDates[0].totalSales : 0; 
    //       } catch (error) {
    //         console.error('Error:', error);
    //         return null;
    //       }
    // },   
    ReportTodaySalesBetween: async (_, { warehouseId, customerId, userIds, paymentStatus, startDate, endDate }, context) => {
      const { sellerId } = context;
    
      try {
        if (!sellerId) {
          throw new Error('You must be logged in with a valid seller ID.');
        }
    
        // Convert startDate and endDate to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        let query = { 
          sellerid: new mongoose.Types.ObjectId(sellerId), 
          billdate: { $gte: start, $lte: end }
        };
    
        if (customerId) {
          query.custid = new mongoose.Types.ObjectId(customerId);
        }
        if (warehouseId) {
          query.whareid = new mongoose.Types.ObjectId(warehouseId);
        }
        if (userIds) {
          query.userid = new mongoose.Types.ObjectId(userIds);
        }
        if (paymentStatus) {
          query.paymentstatus = paymentStatus;
        }
    
        // Aggregate to get total sales
        const salesBetweenDates = await billSaleModel.aggregate([
          {
            $match: query
          },
          {
            $group: {
              _id: null,
              totalSales: { $sum: "$totalamount" }
            }
          }
        ]);
    
        return salesBetweenDates.length > 0 ? salesBetweenDates[0].totalSales : 0;
    
      } catch (error) {
        console.error('Error fetching sales:', error);
        throw new Error('Error fetching sales: ' + error.message);
      }
    },    
    ReportTotalPendingCash: async (_, __, context) => {
      try {
        const { sellerId } = context;
        if (!sellerId) {
          throw new Error('Seller ID is required.');
        }

        const totalPendingCash = await billSaleModel.aggregate([
          {
            $match: { sellerid: new mongoose.Types.ObjectId(sellerId) }
          },
          {
            $group: {
              _id: null,
              totalPendingCash: {
                $sum: { $subtract: ["$totalamount", "$cashreceived"] }
              }
            }
          }
        ]);

        if (totalPendingCash.length === 0) {
          return 0;
        }

        return totalPendingCash[0].totalPendingCash;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    },
    ReportTotalSales: async (_, __, context) => {

      try {
        const { sellerId } = context;
        const totalSales = await billSaleModel.aggregate([
          {
            $match: { sellerid: new mongoose.Types.ObjectId(sellerId) }
          },
          {
            $group: {
              _id: null,
              totalSales: { $sum: "$totalamount" }
            }
          }
        ]);

        // console.log(totalSales);

        if (totalSales.length === 0) {
          // No sales found for the seller
          return 0;
        }

        // Extract the total sales value from the aggregation result
        return totalSales[0].totalSales; // Return the total amount
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    },
    ReportTotalSalesUser: async (_, { startDate, endDate }, context) => {
      try {
        const { userId } = context;
        const startOfDay = new Date(startDate);
        const endOfDay = new Date(endDate);
    
        const todaySales = await billSaleModel.aggregate([
          {
            $match: {
              userid: new mongoose.Types.ObjectId(userId),
              billdate: {
                $gte: startOfDay,
                $lte: endOfDay
              }
            }
          },
          {
            $group: {
              _id: null,
              totalSales: { $sum: "$totalamount" }
            }
          }
        ]);
    
        return todaySales.length > 0 ? todaySales[0].totalSales : 0;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    },    
    ReportTodaySales: async (_, __, context) => {
      try {
        const { sellerId } = context;
        
        const startOfToday = new Date();
        startOfToday.setUTCHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero in UTC time
        
        const endOfToday = new Date();
        endOfToday.setUTCHours(23, 59, 59, 999); // Set hours, minutes, seconds, and milliseconds to end of day in UTC time
        
        const todaySales = await billSaleModel.aggregate([
          {
            $match: {
              sellerid: new mongoose.Types.ObjectId(sellerId),
              billdate: {
                $gte: startOfToday, // Greater than or equal to start of today
                $lte: endOfToday // Less than or equal to end of today
              }
            }
          },
          {
            $group: {
              _id: null,
              totalSales: { $sum: "$totalamount" }
            }
          }
        ]);         
        // Return the total sales for today
        return todaySales.length > 0 ? todaySales[0].totalSales : 0; // If there are no sales today, return 0
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    },     
    ReportPreviousDaySales: async (_, __, context) => {
      try {
        const { sellerId } = context;
    
        // Calculate the start and end of yesterday
        const now = new Date();
        const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        const endOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
        // Aggregation pipeline to calculate total sales for the previous day
        const previousDaySales = await billSaleModel.aggregate([
          {
            $match: {
              sellerid: new mongoose.Types.ObjectId(sellerId),
              billdate: {
                $gte: startOfYesterday,
                $lt: endOfYesterday
              }
            }
          },
          {
            $group: {
              _id: null,
              totalSales: { $sum: "$totalamount" }
            }
          }
        ]);
    
        // Return the total sales for yesterday
        return previousDaySales.length > 0 ? previousDaySales[0].totalSales : 0;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    },        
    ReportgetsalereturnBills: async (_, { warehouseId, customerId, userIds, paymentStatus, startDate, endDate, page }, context) => {
      const { userId, sellerId } = context;

      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = { sellerid: sellerId, billdate: { $gte: startDate, $lte: endDate } };

        if (customerId) {
          query.custid = customerId;
        }
        if (warehouseId) {
          query.whareid = warehouseId;
        }
        if (userIds && userIds.length > 0) {
          query.userid = { $in: userIds };
        }
        if (paymentStatus) {
          query.paymentstatus = paymentStatus;
        }

        //console.log(query);
        const totalCount = await billSaleReturnModel.countDocuments(query);

        const bills = await billSaleReturnModel
          .find(query)
          .populate('whareid', '_id name ')
          .populate('custid', '_id name ')
          .sort({ createdAt: -1 })
          .skip((page - 1) * 10)
          .limit(10);
        return {
          returnbills: bills.map((bill) => ({
            ...bill._doc,
          })),
          totalreturnCount: totalCount,
        };
      } catch (error) {
        throw new Error('Error fetching bills: ' + error.message);
      }
    },
    ReportTodaySalesreturnBetween: async (_, { warehouseId, customerId, userIds, paymentStatus, startDate, endDate }, context) => {
      const { sellerId } = context;
    
      try {
        if (!sellerId) {
          throw new Error('You must be logged in with a valid seller ID.');
        }
    
        // Convert startDate and endDate to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        let query = { 
          sellerid: new mongoose.Types.ObjectId(sellerId), 
          billdate: { $gte: start, $lte: end }
        };
    
        if (customerId) {
          query.custid = new mongoose.Types.ObjectId(customerId);
        }
        if (warehouseId) {
          query.whareid = new mongoose.Types.ObjectId(warehouseId);
        }
        if (userIds) {
          query.userid = new mongoose.Types.ObjectId(userIds);
        }
        if (paymentStatus) {
          query.paymentstatus = paymentStatus;
        }
    
        // Aggregate to get total sales
        const salesBetweenDates = await billSaleReturnModel.aggregate([
          {
            $match: query
          },
          {
            $group: {
              _id: null,
              totalSales: { $sum: "$totalamount" }
            }
          }
        ]);
    
        return salesBetweenDates.length > 0 ? salesBetweenDates[0].totalSales : 0;
    
      } catch (error) {
        console.error('Error fetching sales:', error);
        throw new Error('Error fetching sales: ' + error.message);
      }
    }, 
    ReportTotalPendingsalereturnCash: async (_, __, context) => {
      try {
        const { sellerId } = context;
        if (!sellerId) {
          throw new Error('Seller ID is required.');
        }

        const totalPendingCash = await billSaleReturnModel.aggregate([
          {
            $match: { sellerid: new mongoose.Types.ObjectId(sellerId) }
          },
          {
            $group: {
              _id: null,
              totalPendingCash: {
                $sum: { $subtract: ["$totalamount", "$cashreceived"] }
              }
            }
          }
        ]);

        if (totalPendingCash.length === 0) {
          return 0;
        }

        return totalPendingCash[0].totalPendingCash;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    },
    ReportTotalsalereturn: async (_, __, context) => {

      try {
        const { sellerId } = context;
        const totalSales = await billSaleReturnModel.aggregate([
          {
            $match: { sellerid: new mongoose.Types.ObjectId(sellerId) }
          },
          {
            $group: {
              _id: null,
              totalSales: { $sum: "$totalamount" }
            }
          }
        ]);

        // console.log(totalSales);

        if (totalSales.length === 0) {
          // No sales found for the seller
          return 0;
        }

        // Extract the total sales value from the aggregation result
        return totalSales[0].totalSales; // Return the total amount
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    },
    dailyProfit: async (_, { startDate }, context) => {
      const start = new Date(startDate);
      const end = new Date(startDate);
      end.setDate(end.getDate() + 1);
      const { sellerId } = context;
      try {
        const sales = await billSaleModel.aggregate([
          { $match: 
            { sellerid: new mongoose.Types.ObjectId(sellerId) ,billdate: { $gte: start, $lt: end } } },
          { $unwind: '$salecart' },
          {
            $lookup: {
              from: 'itemsmodels',  // Make sure this is the correct collection name
              localField: 'salecart.id',
              foreignField: '_id',
              as: 'itemDetails',
            },
          },
          { $unwind: '$itemDetails' },
          {
            $group: {
              _id: null,
              totalProfit: {
                $sum: {
                  $subtract: [
                    { $multiply: ['$salecart.price', '$salecart.quantity'] },
                    { $multiply: ['$itemDetails.cost', '$salecart.quantity'] },
                  ],
                },
              },
            },
          },
        ]);
    
        // Directly return the float value
        return sales.length > 0 ? sales[0].totalProfit : 0;
      } catch (error) {
        console.error('Error calculating daily profit:', error);
        throw new Error('Unable to calculate daily profit');
      }
    },
    
 
    
    //purchase reports
    ReportgetsalePurchaseBills: async (_, { warehouseId, customerId, userIds, paymentStatus, startDate, endDate, page }, context) => {
      const { userId, sellerId } = context;


      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = { sellerid: sellerId, billdate: { $gte: startDate, $lte: endDate } };

        if (customerId) {
          query.custid = customerId;
        }
        if (warehouseId) {
          query.whareid = warehouseId;
        }
        if (userIds && userIds.length > 0) {
          query.userid = { $in: userIds };
        }
        if (paymentStatus) {
          query.paymentstatus = paymentStatus;
        }

        //console.log(query);
        const totalCount = await billPurchaseModel.countDocuments(query);

        const bills = await billPurchaseModel
          .find(query)
          .populate('whareid', '_id name ')
          .populate('custid', '_id name ')
          .sort({ createdAt: -1 })
          .skip((page - 1) * 10)
          .limit(10);

        return {
          bills: bills.map((bill) => ({
            ...bill._doc,
          })),
          totalCount: totalCount,
        };
      } catch (error) {
        throw new Error('Error fetching bills: ' + error.message);
      }
    },
    ReportTodayPurBetween: async (_, { warehouseId, customerId, userIds, paymentStatus, startDate, endDate }, context) => {
      const { sellerId } = context;
    
      try {
        if (!sellerId) {
          throw new Error('You must be logged in with a valid seller ID.');
        }
    
        // Convert startDate and endDate to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        let query = { 
          sellerid: new mongoose.Types.ObjectId(sellerId), 
          billdate: { $gte: start, $lte: end }
        };
    
        if (customerId) {
          query.custid = new mongoose.Types.ObjectId(customerId);
        }
        if (warehouseId) {
          query.whareid = new mongoose.Types.ObjectId(warehouseId);
        }
        if (userIds) {
          query.userid = new mongoose.Types.ObjectId(userIds);
        }
        if (paymentStatus) {
          query.paymentstatus = paymentStatus;
        }
    
        // Aggregate to get total sales
        const salesBetweenDates = await billPurchaseModel.aggregate([
          {
            $match: query
          },
          {
            $group: {
              _id: null,
              totalSales: { $sum: "$totalamount" }
            }
          }
        ]);
    
        return salesBetweenDates.length > 0 ? salesBetweenDates[0].totalSales : 0;
    
      } catch (error) {
        console.error('Error fetching sales:', error);
        throw new Error('Error fetching sales: ' + error.message);
      }
    }, 
    ReportTotalPendingPurchaseCash: async (_, __, context) => {
      try {
        const { sellerId } = context;
        if (!sellerId) {
          throw new Error('Seller ID is required.');
        }

        const totalPendingCash = await billPurchaseModel.aggregate([
          {
            $match: { sellerid: new mongoose.Types.ObjectId(sellerId) }
          },
          {
            $group: {
              _id: null,
              totalPendingCash: {
                $sum: { $subtract: ["$totalamount", "$cashreceived"] }
              }
            }
          }
        ]);

        if (totalPendingCash.length === 0) {
          return 0;
        }

        return totalPendingCash[0].totalPendingCash;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    },
    ReportTotalPurchase: async (_, __, context) => {

      try {
        const { sellerId } = context;
        const totalSales = await billPurchaseModel.aggregate([
          {
            $match: { sellerid: new mongoose.Types.ObjectId(sellerId) }
          },
          {
            $group: {
              _id: null,
              totalSales: { $sum: "$totalamount" }
            }
          }
        ]);

        // console.log(totalSales);

        if (totalSales.length === 0) {
          // No sales found for the seller
          return 0;
        }

        // Extract the total sales value from the aggregation result
        return totalSales[0].totalSales; // Return the total amount
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    },
    //purchase return reports
    ReportgetPurchasereturnBills: async (_, { warehouseId, customerId, userIds, paymentStatus, startDate, endDate, page }, context) => {
      const { userId, sellerId } = context;


      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = { sellerid: sellerId, billdate: { $gte: startDate, $lte: endDate } };

        if (customerId) {
          query.custid = customerId;
        }
        if (warehouseId) {
          query.whareid = warehouseId;
        }
        if (userIds && userIds.length > 0) {
          query.userid = { $in: userIds };
        }
        if (paymentStatus) {
          query.paymentstatus = paymentStatus;
        }

        //console.log(query);
        const totalCount = await billPurchaseReturnModel.countDocuments(query);

        const bills = await billPurchaseReturnModel
          .find(query)
          .populate('whareid', '_id name ')
          .populate('custid', '_id name ')
          .sort({ createdAt: -1 })
          .skip((page - 1) * 10)
          .limit(10);

        return {
          bills: bills.map((bill) => ({
            ...bill._doc,
          })),
          totalCount: totalCount,
        };
      } catch (error) {
        throw new Error('Error fetching bills: ' + error.message);
      }
    },
    ReportTodayPurreturnBetween: async (_, { warehouseId, customerId, userIds, paymentStatus, startDate, endDate }, context) => {
      const { sellerId } = context;
    
      try {
        if (!sellerId) {
          throw new Error('You must be logged in with a valid seller ID.');
        }
    
        // Convert startDate and endDate to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        let query = { 
          sellerid: new mongoose.Types.ObjectId(sellerId), 
          billdate: { $gte: start, $lte: end }
        };
    
        if (customerId) {
          query.custid = new mongoose.Types.ObjectId(customerId);
        }
        if (warehouseId) {
          query.whareid = new mongoose.Types.ObjectId(warehouseId);
        }
        if (userIds) {
          query.userid = new mongoose.Types.ObjectId(userIds);
        }
        if (paymentStatus) {
          query.paymentstatus = paymentStatus;
        }
    
        // Aggregate to get total sales
        const salesBetweenDates = await billPurchaseReturnModel.aggregate([
          {
            $match: query
          },
          {
            $group: {
              _id: null,
              totalSales: { $sum: "$totalamount" }
            }
          }
        ]);
    
        return salesBetweenDates.length > 0 ? salesBetweenDates[0].totalSales : 0;
    
      } catch (error) {
        console.error('Error fetching sales:', error);
        throw new Error('Error fetching sales: ' + error.message);
      }
    }, 
    ReportTotalPendingpurchasereturnCash: async (_, __, context) => {
      try {
        const { sellerId } = context;
        if (!sellerId) {
          throw new Error('Seller ID is required.');
        }

        const totalPendingCash = await billPurchaseReturnModel.aggregate([
          {
            $match: { sellerid: new mongoose.Types.ObjectId(sellerId) }
          },
          {
            $group: {
              _id: null,
              totalPendingCash: {
                $sum: { $subtract: ["$totalamount", "$cashreceived"] }
              }
            }
          }
        ]);

        if (totalPendingCash.length === 0) {
          return 0;
        }

        return totalPendingCash[0].totalPendingCash;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    },
    ReportTotalPurchasereturn: async (_, __, context) => {

      try {
        const { sellerId } = context;
        const totalSales = await billPurchaseReturnModel.aggregate([
          {
            $match: { sellerid: new mongoose.Types.ObjectId(sellerId) }
          },
          {
            $group: {
              _id: null,
              totalSales: { $sum: "$totalamount" }
            }
          }
        ]);

        // console.log(totalSales);

        if (totalSales.length === 0) {
          // No sales found for the seller
          return 0;
        }

        // Extract the total sales value from the aggregation result
        return totalSales[0].totalSales; // Return the total amount
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    },


    //Expences Reports
    ReportgetExpense: async (_, { warehouseId, customerId, startDate, endDate, page }, context) => {
      const { userId, sellerId } = context;

      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        let query = { sellerid: sellerId, date: { $gte: startDate, $lte: endDate } };

        if (customerId) {
          query.cateid = customerId;
        }
        if (warehouseId) {
          query.wareid = warehouseId;
        }

        const totalCount = await ExpenseEntryModel.countDocuments(query);

        const bills = await ExpenseEntryModel
          .find(query)
          .populate('wareid', '_id name')
          .populate('cateid', '_id name')
          .sort({ createdAt: -1 })
          .skip((page - 1) * 10)
          .limit(10);

        return {
          PartyEntry: bills.map((bill) => ({
            ...bill._doc,
          })),
          PartyEntryCount: totalCount,
        };
      } catch (error) {
        throw new Error('Error fetching bills: ' + error.message);
      }
    },
    ReportTotalExpense: async (_, __, context) => {

      try {
        const { sellerId } = context;
        const totalSales = await ExpenseEntryModel.aggregate([
          {
            $match: { sellerid: new mongoose.Types.ObjectId(sellerId) }
          },
          {
            $group: {
              _id: null,
              totalSales: { $sum: "$amount" }
            }
          }
        ]);

        // console.log(totalSales);

        if (totalSales.length === 0) {
          // No sales found for the seller
          return 0;
        }

        // Extract the total sales value from the aggregation result
        return totalSales[0].totalSales; // Return the total amount
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    },
    //ledger report purchase
    LedgerTotalPurchasepay: async (_, { warehouseId, customerId }, context) => {
      try {
        const { sellerId } = context;
        if (!sellerId) {
          throw new Error('Seller ID is required.');
        }

        const totalPendingCash = await billPurchaseModel.aggregate([
          {
            $match: {
              sellerid: new mongoose.Types.ObjectId(sellerId),
              whareid: new mongoose.Types.ObjectId(warehouseId),
              custid: new mongoose.Types.ObjectId(customerId)
            }
          },
          {
            $group: {
              _id: null,
              totalPendingCash: {
                $sum: {
                  $subtract: ["$totalamount", "$cashreceived"]
                }
              }
            }
          }
        ]);

        // Check if any data is returned
        if (totalPendingCash.length === 0) {
          return 0; // No pending cash found
        }

        return totalPendingCash[0].totalPendingCash;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    },
    LedgerotalPurchasereturnpay: async (_, { warehouseId, customerId }, context) => {
      try {
        const { sellerId } = context;
        if (!sellerId) {
          throw new Error('Seller ID is required.');
        }

        const totalPendingCash = await billPurchaseReturnModel.aggregate([
          {
            $match: {
              sellerid: new mongoose.Types.ObjectId(sellerId),
              whareid: new mongoose.Types.ObjectId(warehouseId),
              custid: new mongoose.Types.ObjectId(customerId)
            }
          },
          {
            $group: {
              _id: null,
              totalPendingCash: {
                $sum: {
                  $subtract: ["$totalamount", "$cashreceived"]
                }
              }
            }
          }
        ]);

        // Check if any data is returned
        if (totalPendingCash.length === 0) {
          return 0; // No pending cash found
        }

        return totalPendingCash[0].totalPendingCash;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    },
    //ledger report sale
    LedgerToatalSalpay: async (_, { warehouseId, customerId }, context) => {
      try {
        const { sellerId } = context;
        if (!sellerId) {
          throw new Error('Seller ID is required.');
        }

        const totalPendingCash = await billSaleModel.aggregate([
          {
            $match: {
              sellerid: new mongoose.Types.ObjectId(sellerId),
              whareid: new mongoose.Types.ObjectId(warehouseId),
              custid: new mongoose.Types.ObjectId(customerId)
            }
          },
          {
            $group: {
              _id: null,
              totalPendingCash: {
                $sum: {
                  $subtract: ["$totalamount", "$cashreceived"]
                }
              }
            }
          }
        ]);

        // Check if any data is returned
        if (totalPendingCash.length === 0) {
          return 0; // No pending cash found
        }

        return totalPendingCash[0].totalPendingCash;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    },
    Ledgerotalsalereturnpay: async (_, { warehouseId, customerId }, context) => {
      try {
        const { sellerId } = context;
        if (!sellerId) {
          throw new Error('Seller ID is required.');
        }

        const totalPendingCash = await billSaleReturnModel.aggregate([
          {
            $match: {
              sellerid: new mongoose.Types.ObjectId(sellerId),
              whareid: new mongoose.Types.ObjectId(warehouseId),
              custid: new mongoose.Types.ObjectId(customerId)
            }
          },
          {
            $group: {
              _id: null,
              totalPendingCash: {
                $sum: {
                  $subtract: ["$totalamount", "$cashreceived"]
                }
              }
            }
          }
        ]);

        // Check if any data is returned
        if (totalPendingCash.length === 0) {
          return 0; // No pending cash found
        }

        return totalPendingCash[0].totalPendingCash;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    },
    getStocks: async (_, { warehouseId, cateid, brandid, page }, context) => {


      try {
        const { userId, sellerId } = context;
        let query = {};

        // If warehouseId is provided, add it to the query
        if (warehouseId) {
          query.warehouseId = warehouseId;
        }

        // If cateid is provided, add it to the query
        if (cateid) {
          query['productId.cateid'] = cateid;
        }

        // If brandid is provided, add it to the query
        if (brandid) {
          query['productId.brandid'] = brandid;
        }
        if (sellerId) {
          query.sellerid = sellerId;
        }
        const stockItems = await stockModel
          .find(query)
          .populate({
            path: 'productId',
            populate: {
              path: 'brandid',
              model: 'brandsModel' // Adjust the model name if needed
            }
          }).sort({ createdAt: -1 })
          .skip((page - 1) * 10)
          .limit(10);
        const totalCount = await stockModel.countDocuments(query);

        return { stockItems, totalCount };

        // const stockItems = await stockModel.find(query).populate('productId');
        // return stockItems;
      } catch (error) {
        console.error('Error fetching stock items:', error);
        throw error;
      }

    },
    searchSales: async (_, { criteria }) => {
      const query = {};

      if (criteria.cateid) {
        const items = await itemsModel.find({ cateid: criteria.cateid }).select('_id');
        query['salecart.id'] = { $in: items.map(item => item._id) };
      }

      if (criteria.whareid) {
        query.whareid = criteria.whareid;
      }

      if (criteria.custid) {
        query.custid = criteria.custid;
      }

      if (criteria.productid) {
        query['salecart.id'] = criteria.productid;
      }

      if (criteria.userid) {
        query.userid = criteria.userid;
      }

      if (criteria.startDate && criteria.endDate) {
        query.billdate = {
          $gte: new Date(criteria.startDate),
          $lte: new Date(criteria.endDate)
        };
      } else if (criteria.startDate) {
        query.billdate = { $gte: new Date(criteria.startDate) };
      } else if (criteria.endDate) {
        query.billdate = { $lte: new Date(criteria.endDate) };
      }

      try {
        const sales = await billSaleModel.find(query).populate('whareid custid userid salecart.id');
        return sales;
      } catch (error) {
        console.error('Error fetching sales:', error);
        throw new Error('Error fetching sales');
      }
    },
    getSumByWarehouse: async (_, { warehouseId}, context) => {
      try {
       // console.log('Warehouse ID:', warehouseId);
       // const documents = await stockModel.find({ warehouseId: new mongoose.Types.ObjectId(warehouseId) });
        //console.log('Documents found:', documents);
        
        const result = await stockModel.aggregate([
          { $match: { warehouseId: new mongoose.Types.ObjectId(warehouseId) } }, // Match documents by warehouseId
          {
            $lookup: {
              from: 'itemsmodels', // The collection name for itemsModel
              localField: 'productId',
              foreignField: '_id',
              as: 'productDetails'
            }
          },
          { $unwind: '$productDetails' },
          {
            $addFields: {
              cost: { $toDouble: '$productDetails.cost' }, // Convert cost to number
              price: { $toDouble: '$productDetails.price' }  // Convert price to number
            }
          },
          {
            $group: {
              _id: '$warehouseId', // Group by warehouseId
              totalCost: { $sum: { $multiply: ['$cost', '$quantity'] } }, // Calculate total cost
              totalRetail: { $sum: { $multiply: ['$price', '$quantity'] } } // Calculate total retail
            }
          }
        ]);
    
       // console.log('Aggregation Result:', result); // Log the result for debugging
    
        if (result.length > 0) {
          return {
            totalCost: result[0].totalCost,
            totalRetail: result[0].totalRetail
          };
        } else {
          return {
            totalCost: 0,
            totalRetail: 0
          };
        }
      } catch (error) {
        console.error('Error calculating total values:', error);
        throw new Error('Failed to calculate total values');
      }
    },
    ReportTotalDiscount: async (_, __, context) => {
      try {
        const { sellerId } = context;
    console.log('Warehouse ID:', sellerId);
        // Aggregate the total discount across all bill sales for a given seller
        const totalDiscounts = await billSaleModel.aggregate([
          {
            $match: { sellerid: new mongoose.Types.ObjectId(sellerId) } // Filter by sellerId
          },
          {
            $group: {
              _id: '$sellerid', // Group by sellerId
              totalDiscount: { $sum: '$discount' } // Sum the discount field
            }
          }
        ]);
    
        if (totalDiscounts.length === 0) {
          // No discounts found for the seller
          return 0;
        }
    
        // Return the total discount
        return totalDiscounts[0].totalDiscount;
      } catch (error) {
        console.error('Error calculating total discounts:', error);
        return null;
      }
    },
    ReportTotalDiscountCart: async (_, __, context) => {
      try {
        const { sellerId } = context;
    
        // Aggregate discounts across all bill sales for a given seller
        const totalDiscounts = await billSaleModel.aggregate([
          {
            $match: { sellerid: new mongoose.Types.ObjectId(sellerId) } // Filter by sellerId
          },
          {
            $unwind: '$salecart' // Unwind the salecart array
          },
          {
            $group: {
              _id: '$sellerid', // Group by sellerId
              totalDiscount: { $sum: { $multiply: ['$salecart.discount', '$salecart.quantity'] } } // Calculate total discount
            }
          }
        ]);
    
        if (totalDiscounts.length === 0) {
          // No discounts found for the seller
          return 0;
        }
    
        // Return the total discount
        return totalDiscounts[0].totalDiscount;
      } catch (error) {
        console.error('Error calculating total discounts:', error);
        return null;
      }
    },
    //charts 
    getMonthlyData: async (_, __, context) => {
      const currentYear = new Date().getFullYear();
      const { sellerId } = context;
      // Fetch Monthly Sales
      const salesData = await billSaleModel.aggregate([
        {
          $match: { 
            sellerid: new mongoose.Types.ObjectId(sellerId) , // Filter by sellerId
            billdate: {
              $gte: new Date(`${currentYear}-01-01`),
              $lt: new Date(`${currentYear + 1}-01-01`),
            },
          },
        },
        {
          $group: {
            _id: { $month: "$billdate" }, // Group by month
            totalSales: { $sum: "$totalamount" }, // Sum the total sales
          },
        },
        {
          $sort: { "_id": 1 }, // Sort by month
        },
      ]);

      // Fetch Monthly Purchases
      const purchaseData = await billPurchaseModel.aggregate([
        {
          $match: {
            sellerid: new mongoose.Types.ObjectId(sellerId) , // Filter by sellerId
            billdate: {
              $gte: new Date(`${currentYear}-01-01`),
              $lt: new Date(`${currentYear + 1}-01-01`),
            },
          },
        },
        {
          $group: {
            _id: { $month: "$billdate" }, // Group by month
            totalPurchases: { $sum: "$totalamount" }, // Sum the total purchases
          },
        },
        {
          $sort: { "_id": 1 }, // Sort by month
        },
      ]);

      // Fetch Monthly Expenses
      const expenseData = await expenseEntryModel.aggregate([
        {
          $match: {
            sellerid: new mongoose.Types.ObjectId(sellerId) , // Filter by sellerId
            date: {
              $gte: new Date(`${currentYear}-01-01`),
              $lt: new Date(`${currentYear + 1}-01-01`),
            },
          },
        },
        {
          $group: {
            _id: { $month: "$date" }, // Group by month
            totalExpenses: { $sum: "$amount" }, // Sum the total expenses
          },
        },
        {
          $sort: { "_id": 1 }, // Sort by month
        },
      ]);

      // Combine the results into a single array of objects
      const monthlyData = Array.from({ length: 12 }, (_, index) => {
        const month = index + 1; // Months are 1-based
        const sale = salesData.find((sale) => sale._id === month);
        const purchase = purchaseData.find((purchase) => purchase._id === month);
        const expense = expenseData.find((expense) => expense._id === month);

        return {
          month: format(new Date(currentYear, index), 'MMMM'), // Convert the month number to month name
          totalSales: sale ? sale.totalSales : 0,
          totalPurchases: purchase ? purchase.totalPurchases : 0,
          totalExpenses: expense ? expense.totalExpenses : 0,
        };
      });

      return monthlyData;
    },
    getExpiringProducts: async (_, { page, pageSize }) => {
      // Calculate the number of documents to skip based on the page number and page size
      const skip = (page - 1) * pageSize;

      // Get the total count of expiring products
      const totalCount = await billPurchaseModel.countDocuments([
        { $unwind: "$purchasecart" },
        {
          $addFields: {
            expiryInDays: {
              $divide: [
                { $subtract: ["$purchasecart.expiryDate", "$billdate"] },
                1000 * 60 * 60 * 24 // Convert milliseconds to days
              ]
            }
          }
        },
        { $match: { expiryInDays: { $lte: 90, $gte: 0 } } }
      ]);

      // Get the paginated list of expiring products
      const products = await billPurchaseModel.aggregate([
        { $unwind: "$purchasecart" },
        {
          $addFields: {
            expiryInDays: {
              $divide: [
                { $subtract: ["$purchasecart.expiryDate", "$billdate"] },
                1000 * 60 * 60 * 24 // Convert milliseconds to days
              ]
            }
          }
        },
        { $match: { expiryInDays: { $lte: 90, $gte: 0 } } },
        {
          $project: {
            _id: 0,
            productName: "$purchasecart.name",
            price: "$purchasecart.price",
            quantity: "$purchasecart.quantity",
            batchNo: "$purchasecart.batchNo",
            expiryDate: "$purchasecart.expiryDate",
            billdate: 1
          }
        },
        { $skip: skip },
        { $limit: pageSize }
      ]);

      // Return the paginated result
      return {
        products,
        totalCount
      };
    },
    

  },
  Mutation: 
  {
    signupUser: async (_, { userNew }) => {
      try {
        const user = await userModel.findOne({ mobileno: userNew.mobileno });
        if (user) {
          throw new Error('User already exists with that Mobile');
        }
        const hashedPassword = await bcrypt.hash(userNew.password, 12);

        const newUser = new userModel({
          ...userNew,
          password: hashedPassword
        });
        return await newUser.save();
      } catch (error) {
        throw new Error('Error signing up user: ' + error.message);
      }
    },
    signupSeller: async (_, { userNew }) => {
      try {
        // Check if the user already exists
        const existingUser = await userModel.findOne({ mobileno: userNew.mobileno });
        if (existingUser) {
          throw new Error('User already exists with that Mobile');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userNew.password, 12);

        // Create a new seller
        const newSeller = await sellerModel.create({
          sellername: userNew.name,
          mobilenumber: userNew.mobileno
        });

        // Create a new user with the seller ID reference
        const newUser = new userModel({
          name: userNew.name,
          mobileno: userNew.mobileno,
          password: hashedPassword,
          role: 'seller', // Assuming the user is signing up as a seller
          sellerid: newSeller._id // Reference to the newly created seller
        });

        // Save the new user to the database
        await newUser.save();

        // Return the newly created user
        return newUser;
      } catch (error) {
        throw new Error('Error signing up seller: ' + error.message);
      }
    },
    signupSubUser: async (_, { userNew }, context) => {
      const { userId, sellerId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ mobileno: userNew.mobileno });
        if (existingUser) {
          throw new Error('User already exists with that Mobile');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userNew.password, 12);


        // Count the number of users for the given sellerid
        const userCount = await userModel.countDocuments({ sellerid: sellerId });

        // Check if the user count exceeds the limit (3 users)
        if (userCount >= 2) {
          throw new Error('You have reached the maximum limit of users for this shop.');
        }

        // Create a new user with the seller ID reference
        const newUser = new userModel({
          name: userNew.name,
          mobileno: userNew.mobileno,
          password: hashedPassword,
          role: 'subuser', // Assuming the user is signing up as a seller
          sellerid: sellerId // Reference to the newly created seller
        });

        // Save the new user to the database
        await newUser.save();

        // Return the newly created user
        return newUser;
      } catch (error) {
        throw new Error('Error signing up seller: ' + error.message);
      }
    },
    changePassword: async (_, { oldPassword, newPassword }, context) => {
      const { userId } = context;
      try {
        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }
        const user = await userModel.findById(userId);
        if (!user) {
          throw new AuthenticationError('User not found');
        }

        // Check if the provided old password matches the one in the database
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordCorrect) {
          throw new AuthenticationError('Invalid old password');
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);

        // Update the user's password
        user.password = hashedNewPassword;
        await user.save();

        return {
          success: true,
          message: 'Password changed successfully'
        };
      } catch (error) {
        throw new Error('Error changing password: ' + error.message);
      }
    },
    signinUser: async (_, { userSignin }) => {
      try {
        // Validate user credentials
        const user = await userModel.findOne({ mobileno: userSignin.mobileno, verified: true });
        if (!user) {
          throw new Error('User doesn\'t exist with this Mobile');
        }

        const doMatch = await bcrypt.compare(userSignin.password, user.password);
        if (!doMatch) {
          throw new Error('Mobile or password is invalid');
        }

        // Fetch seller information if available
        let sellerInfo = null;
        if (user.sellerid) {
          const seller = await sellerModel.findById(user.sellerid);
          if (seller) {
            sellerInfo = {
              shopname: seller.shopname,
              mobilenumber: seller.mobilenumber,
              email: seller.email,
              city: seller.city,
              country: seller.country,
              address: seller.address,
              sortby: seller.sortby,
              notes: seller.notes,
              posid: seller.posid,
              fbrtoken: seller.fbrtoken,
            };
          }
        }

        // Sign the token with userId and set expiration to 10 hours
        const token = jwt.sign(
          { userId: user._id,name:user.name ,role: user.role, sellerId: user.sellerid,sellerInfo },
          process.env.JWT_SECRET,
          { expiresIn: '10h' }
        );

        // Return the authentication payload including sellerInfo
        return { token,sellerInfo };
      } catch (error) {
        throw new Error('Error signing in user: ' + error.message);
      }
    },
    addCategory: async (_, { addNewCategory }, context) => {
      try {
        const { userId, sellerId, role } = context;
        let { name } = addNewCategory;

        if (!userId) {
          throw new Error("You must be logged in");
        }
  // Check if the user has the correct role
      // if (!['seller', 'subuser'].includes(role)) {
      //   throw new Error("You do not have the required permissions to add a category");
      // }
      if (role !== 'seller') {
        throw new Error("You do not have the required permissions to add a category");
      }
        if (!name) {
          throw new Error("Name is required");
        }

        // Convert the name to lowercase for case-insensitive comparison
        name = name.toLowerCase();

        // Check if a category with the same name already exists for the given sellerId (case-insensitive)
        const existingCategory = await categoryModel.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') }, sellerid: sellerId });
        if (existingCategory) {
          throw new Error('Category with the same name already exists for this seller.');
        }

        const newCategory = new categoryModel({
          name: name, // Save the name in lowercase
          userid: userId,
          sellerid: sellerId,
        });

        // Save the new category
        const savedCategory = await newCategory.save();

        return {
          ...savedCategory._doc,
          createdAt: savedCategory.createdAt.toISOString(),
        };
      } catch (error) {
        console.error("Error adding category:", error);
        throw new Error(`Error adding category: ${error.message}`);
      }
    },
    UpdateCategory: async (_, args, context) => {
      try {
        const { userId, sellerId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }
        let { id, name } = args;

        // Convert the name to lowercase for case-insensitive comparison
        name = name.toLowerCase();

        // Check if a category with the updated name already exists for the given sellerId (case-insensitive)
        const existingCategory = await categoryModel.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') }, sellerid: sellerId });
        if (existingCategory && existingCategory._id.toString() !== id) {
          throw new Error('Category with the updated name already exists for this seller.');
        }

        const updatedCategory = await categoryModel.findByIdAndUpdate(id, { name }, { new: true });

        if (!updatedCategory) {
          throw new Error("Category not found");
        }

        return updatedCategory;
      } catch (error) {
        console.error("Error updating category:", error);
        throw new Error(`Error updating category: ${error.message}`);
      }
    },
    DelteCategory: async (_, args, context) => {
      const { userId, role } = context;
      
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }
      // If no items are associated with the category, proceed with deletion
      await categoryModel.findByIdAndDelete(args.id);
      return "Category deleted successfully";
    },
    addExpCategory: async (_, { addNewExpCategory }, context) => {
      const { userId, sellerId } = context;
      let { name } = addNewExpCategory;

      if (!userId) {
        throw new Error("You must be logged in");
      }

      if (!name) {
        throw new Error("Name is required");
      }

      try {
        // Convert the name to lowercase for case-insensitive comparison
        name = name.toLowerCase();

        // Check if an expense category with the same name already exists for the given sellerId (case-insensitive)
        const existingExpCategory = await expensecategoryModel.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') }, sellerid: sellerId });
        if (existingExpCategory) {
          throw new Error('Expense category with the same name already exists for this seller.');
        }

        const newCategory = new expensecategoryModel({
          name,
          userid: userId,
          sellerid: sellerId, // Assign the sellerid obtained from the user
        });

        // Save the new category
        const savedCategory = await newCategory.save();

        return {
          ...savedCategory._doc,
          createdAt: savedCategory.createdAt.toISOString(),
        };
      } catch (error) {
        throw new Error(`Error adding expense category: ${error.message}`);
      }
    },
    UpdateExpCategory: async (_, args, context) => {
      try {
        const { userId, sellerId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }
        const { id, name } = args;

        // Convert the name to lowercase for case-insensitive comparison
        const lowercaseName = name.toLowerCase();

        // Check if an expense category with the updated name already exists for the given sellerId (case-insensitive)
        const existingExpCategory = await expensecategoryModel.findOne({ name: { $regex: new RegExp('^' + lowercaseName + '$', 'i') }, sellerid: sellerId });
        if (existingExpCategory && existingExpCategory._id.toString() !== id) {
          throw new Error('Expense category with the updated name already exists for this seller.');
        }

        const updatedCategory = await expensecategoryModel.findByIdAndUpdate(id, { name: lowercaseName }, { new: true });

        if (!updatedCategory) {
          throw new Error("Category not found");
        }

        return updatedCategory;
      } catch (error) {
        console.error("Error updating category:", error);
        throw new Error(`Error updating category: ${error.message}`);
      }
    },
    DelteExpCategory: async (_, args, context) => {
      const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }
      // Count the number of items associated with the category ID
      const itemCount = await ExpenseEntryModel.countDocuments({ cateid: args.id });

      if (itemCount > 0) {
        throw new Error("Cannot delete category as it is referenced in expenseEntry");
      }
      await expensecategoryModel.findByIdAndDelete(args.id);
      return "Category Delte successfully"
    },
    addWarehouse: async (_, { addNewWarehouse }, context) => {
      const { userId, sellerId } = context;
      let { name, location } = addNewWarehouse;

      if (!userId) {
        throw new Error("You must be logged in");
      }

      if (!name) {
        throw new Error("Name and location are required for adding a warehouse");
      }

      try {
        // Convert the name to lowercase for case-insensitive comparison
        name = name.toLowerCase();

        // Check if a warehouse with the same name already exists for the given sellerId (case-insensitive)
        const existingWarehouse = await warehouseModel.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') }, sellerid: sellerId });
        if (existingWarehouse) {
          throw new Error('Warehouse with the same name already exists for this seller.');
        }

        const newWarehouse = new warehouseModel({
          name,
          location,
          userid: userId,
          sellerid: sellerId, // Assign the sellerid obtained from the user
        });

        // Save the new warehouse
        const savedWarehouse = await newWarehouse.save();

        return {
          ...savedWarehouse._doc,
          createdAt: savedWarehouse.createdAt.toISOString(),
        };
      } catch (error) {
        throw new Error(`Error adding warehouse: ${error.message}`);
      }
    },
    UpdateWarehouse: async (_, { id, name, location }, context) => {
      try {
        const { userId, sellerId } = context;

        if (!userId) {
          throw new Error("You must be logged in");
        }

        // Convert the name to lowercase for case-insensitive comparison
        const lowercaseName = name.toLowerCase();

        // Check if a warehouse with the updated name already exists for the given sellerId (case-insensitive)
        const existingWarehouse = await warehouseModel.findOne({ name: { $regex: new RegExp('^' + lowercaseName + '$', 'i') }, sellerid: sellerId });
        if (existingWarehouse && existingWarehouse._id.toString() !== id) {
          throw new Error('Warehouse with the updated name already exists for this seller.');
        }

        const updatedWarehouse = await warehouseModel.findByIdAndUpdate(
          id,
          { name, location },
          { new: true }
        );

        if (!updatedWarehouse) {
          throw new Error("Warehouse not found");
        }

        return updatedWarehouse;
      } catch (error) {
        console.error("Error updating warehouse:", error);
        throw new Error(`Error updating warehouse: ${error.message}`);
      }
    },
    deleteWarehouse: async (_, { id }, context) => {
      const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }
      // Count the number of items associated with the brand ID
      const itemCount = await billSaleModel.countDocuments();

      if (itemCount > 0) {
        throw new Error("Cannot delete warehouse as it is referenced in SaleModel");
      }
      await warehouseModel.findByIdAndDelete(id);
      return "Warehouse deleted successfully";
    },
    addBrands: async (_, { addNewBrands }, context) => {
      try {
        const { userId, sellerId } = context;
        let { name } = addNewBrands;

        if (!userId) {
          throw new Error('You must be logged in with a mobile number.');
        }

        if (!name) {
          throw new Error("Brand name is required");
        }

        // Convert the name to lowercase for case-insensitive comparison
        name = name.toLowerCase();

        // Check if a brand with the same name already exists for the given sellerId (case-insensitive)
        const existingBrand = await brandsModel.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') }, sellerid: sellerId });
        if (existingBrand) {
          throw new Error('Brand with the same name already exists for this seller.');
        }

        const newBrand = new brandsModel({
          name: name, // Save the name in lowercase
          userid: userId,
          sellerid: sellerId,
        });

        // Save the new brand
        const savedBrand = await newBrand.save();

        return {
          ...savedBrand._doc,
          createdAt: savedBrand.createdAt.toISOString(),
        };
      } catch (error) {
        console.error("Error adding brand:", error.message);
        throw new Error(`Error adding brand: ${error.message}`);
      }
    },
    UpdateBrands: async (_, args, context) => {
      try {
        const { userId, sellerId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }
        let { id, name } = args;

        // Convert the name to lowercase for case-insensitive comparison
        name = name.toLowerCase();

        // Check if a brand with the updated name already exists for the given sellerId (case-insensitive)
        const existingBrand = await brandsModel.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') }, sellerid: sellerId });
        if (existingBrand && existingBrand._id.toString() !== id) {
          throw new Error('Brand with the updated name already exists for this seller.');
        }

        // Find the brand by id and sellerId
        const brand = await brandsModel.findOneAndUpdate({ _id: id, sellerid: sellerId }, { name }, { new: true });

        if (!brand) {
          throw new Error("Brand not found or you don't have permission to update it");
        }

        return brand;
      } catch (error) {
        console.error("Error updating brand:", error);
        throw new Error(`Error updating brand: ${error.message}`);
      }
    },
    DelteBrands: async (_, args, context) => {
      const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }

      // Count the number of items associated with the brand ID
      const itemCount = await itemsModel.countDocuments({ brandid: args.id });

      if (itemCount > 0) {
        throw new Error("Cannot delete brand as it is referenced in itemModel");
      }

      // If no items are associated with the brand, proceed with deletion
      await brandsModel.findByIdAndDelete(args.id);
      return "Brand deleted successfully";
    },
    addUnits: async (_, { addNewUnits }, context) => {
      try {
        const { userId, sellerId } = context;
        const { name, basename } = addNewUnits;

        if (!userId) {
          throw new Error("You must be logged in");
        }

        if (!name) {
          throw new Error("Name is required");
        }

        // Convert the name to lowercase for case-insensitive comparison
        const lowerCaseName = name.toLowerCase();

        // Check if a unit with the same name already exists for the given sellerId (case-insensitive)
        const existingUnit = await unitsModel.findOne({ name: { $regex: new RegExp('^' + lowerCaseName + '$', 'i') }, sellerid: sellerId });
        if (existingUnit) {
          throw new Error('Unit with the same name already exists for this seller.');
        }

        const newUnits = new unitsModel({
          name: lowerCaseName, // Save the name in lowercase
          basename,
          userid: userId,
          sellerid: sellerId,
        });

        // Save the new units
        const savedUnits = await newUnits.save();

        return {
          ...savedUnits._doc,
          createdAt: savedUnits.createdAt.toISOString(),
        };
      } catch (error) {
        console.error("Error adding Units:", error);
        throw new Error(`Error adding Units: ${error.message}`);
      }
    },
    UpdateUnits: async (_, args, context) => {
      try {
        const { userId, sellerId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }

        const { id, name, basename } = args;

        // Convert the name to lowercase for case-insensitive comparison
        const lowerCaseName = name.toLowerCase();

        // Check if a unit with the updated name already exists for the given sellerId (case-insensitive)
        const existingUnit = await unitsModel.findOne({ name: { $regex: new RegExp('^' + lowerCaseName + '$', 'i') }, sellerid: sellerId });
        if (existingUnit && existingUnit._id.toString() !== id) {
          throw new Error('Unit with the updated name already exists for this seller.');
        }

        const updatedUnit = await unitsModel.findByIdAndUpdate(
          id,
          { name: lowerCaseName, basename },
          { new: true }
        );

        if (!updatedUnit) {
          throw new Error("Unit not found");
        }

        return updatedUnit;
      } catch (error) {
        console.error("Error updating unit:", error);
        throw new Error(`Error updating unit: ${error.message}`);
      }
    },
    DelteUnits: async (_, args, context) => {
      const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }

      // Count the number of items associated with the unit ID
      const itemCount = await itemsModel.countDocuments({ unitid: args.id });

      if (itemCount > 0) {
        throw new Error("Cannot delete unit as it is referenced in itemModel");
      }

      // If no items are associated with the unit, proceed with deletion
      await unitsModel.findByIdAndDelete(args.id);
      return "Unit deleted successfully";
    },
    addItem: async (_, { item }, context) => {
      try {
        const { userId, sellerId } = context;
        const {
          productname,
          brandid,
          cateid,
          unitid,
          barcode,
          cost,
          price,
          wsprice,
          discount,
          alertqty,
          stockqty,
          whareid,
          tax,
          ordernote,
        } = item;

        if (!userId) {
          throw new Error("You must be logged in");
        }

        if (!productname) {
          throw new Error("Product name is required");
        }
        if (!price) {
          throw new Error("Price is required");
        }

        // Convert the product name to lowercase for case-insensitive comparison
        const lowerCaseProductName = productname.toLowerCase();

        // Check if an item with the same name already exists for the given sellerId (case-insensitive)
        const existingItem = await itemsModel.findOne({ productname: { $regex: new RegExp('^' + lowerCaseProductName + '$', 'i') }, sellerid: sellerId });
        if (existingItem) {
          throw new Error('An item with the same name already exists for this seller.');
        }

        let barcodeArray = [];
        // Check if barcode is provided and not empty
        if (barcode !== null && Array.isArray(barcode) && barcode.length > 0 && barcode.some(code => code !== '')) {
          // Check if any of the barcodes already exist for the given sellerId (case-insensitive)
          const existingItemsWithBarcode = await itemsModel.find({ barcode: { $in: barcode }, sellerid: sellerId });
          if (existingItemsWithBarcode.length > 0) {
            throw new Error('An item with one of the provided barcodes already exists for this seller.');
          }
          barcodeArray = barcode; // Assign the provided barcode array
        }

        // Find the maximum code in the database
        // const maxItem = await itemsModel.findOne({}, { code: 1 }, { sort: { 'code': -1 } });
        const maxItem = await itemsModel.findOne({}, { code: 1 }).sort({ 'code': -1 });
        let newCode = maxItem && maxItem.code ? parseInt(maxItem.code) + 1 : 1000;
        const newItemData = {
          productname: lowerCaseProductName,
          code: newCode,
          brandid,
          cateid,
          unitid,
          cost,
          price,
          wsprice,
          discount,
          alertqty,
          stockqty,
          whareid,
          tax,
          ordernote,
          userid: userId,
          sellerid: sellerId,
          barcode: barcodeArray,
        };

        const newItem = new itemsModel(newItemData);

        // Save the new item
        const savedItem = await newItem.save();

      
        if (stockqty && whareid) {
          const stock = new stockModel({
            productId: savedItem._id,
            warehouseId: whareid,
            quantity: stockqty,
            sellerid: sellerId
          });
    
          await stock.save();
        }
       
        return {
          ...savedItem._doc,
          createdAt: savedItem.createdAt.toISOString(),
        };
      } catch (error) {
        console.error("Error adding item:", error);
        throw new Error(`Error adding item: ${error.message}`);
      }
    },
    updateItem: async (_, { id, updatedItem }, context) => {
      try {
        const { userId, sellerId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }
      
        // Convert the updated item name to lowercase for case-insensitive comparison
        if (updatedItem.productname) {
          updatedItem.productname = updatedItem.productname.toLowerCase();
        }

        // Check if an item with the updated name already exists for the given sellerId (case-insensitive)
        if (updatedItem.productname) {
          const existingItem = await itemsModel.findOne({ productname: { $regex: new RegExp('^' + updatedItem.productname + '$', 'i') }, sellerid: sellerId });
          if (existingItem && existingItem._id.toString() !== id) {
            throw new Error('An item with the updated name already exists for this seller.');
          }
        }

        let barcodeArray = [];
        // Check if barcode is provided and not empty
        if (updatedItem.barcode !== null && Array.isArray(updatedItem.barcode) && updatedItem.barcode.length > 0 && updatedItem.barcode.some(code => code !== '')) {
          // Check if any of the barcodes already exist for the given sellerId (case-insensitive)
          const existingItemsWithBarcode = await itemsModel.find({ barcode: { $in: updatedItem.barcode }, sellerid: sellerId });
          for (const existingItem of existingItemsWithBarcode) {
            if (existingItem._id.toString() !== id) {
              throw new Error('An item with one of the updated barcodes already exists for this seller.');
            }
          }
          barcodeArray = updatedItem.barcode; // Assign the provided barcode array
        }
        if (updatedItem.stockqty !== undefined && updatedItem.stockqty > 0) {
          let stock = await stockModel.findOne({ productId: id, warehouseId: updatedItem.whareid, sellerid: sellerId });
          if (stock) {
            stock.quantity += parseInt(updatedItem.stockqty);
            await stock.save();
          } else {
            // If no stock entry exists, create a new one
            stock = new stockModel({
              productId: id,
              warehouseId: updatedItem.whareid,
              quantity: updatedItem.stockqty,
              sellerid: sellerId
            });
            await stock.save();
          }
        }
        const updatedItemResult = await itemsModel.findByIdAndUpdate(
          id,
          { $set: updatedItem },
          { new: true }
        );
        return updatedItemResult;
      } catch (error) {
        console.error("Error updating item:", error);
        throw new Error(`Error updating item: ${error.message}`);
      }
    },
    deleteItem: async (_, args, context) => {
      const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }
      // Count the number of items associated with the unit ID
      const itemCount = await billSaleModel.countDocuments();

      if (itemCount > 0) {
        throw new Error("Cannot delete items as it is referenced in Sale");
      }
      await itemsModel.findByIdAndDelete(args.id);
      return "Items Delte successfully"
    },
    deleteBillWaste: async (_, { id }, context) => {
      const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }
    
      try {
        // Find the bill sale to be deleted
        const billSale = await billWasteModel.findById(id);
        if (!billSale) {
          throw new Error("Bill sale not found");
        }
       // Delete the bill sale
        await billWasteModel.findByIdAndDelete(id);
        // Restore stock for each item in the deleted bill sale
        for (const item of billSale.wastecart) {
          const { id: productId, quantity } = item; // Changed 'id' to 'productId'
    
          // Find the stock entry for the warehouse and product
          let stock = await stockModel.findOne({ productId, warehouseId: billSale.whareid }); // Changed 'id' to 'productId'
    
          if (stock) {
            // If stock entry exists, update the quantity
            stock.quantity += quantity;
            await stock.save(); // Moved the save operation inside the if block
          }
        }
   
       
    
        return "Bill waste deleted successfully";
      } catch (error) {
        throw new Error(`Error deleting bill sale: ${error.message}`);
      }
    }, 
    createBillWaste: async (_, { CreateWasteSale }, context) => {
      const { userId, sellerId } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
    
      const {
        billdate, whareid, custid, discount, saletax, shippingcharges,
        totalamount, billstatus, paymentstatus, paymentMode, cashreceived, receivedamount,
        notes, invoiceNumberfbr, wastecart, customerName, mobileNumber, deliveryAddress,
        riderName, riderid, waiterName, waiterid, tableName, tabileid,chefid, orderType,kitchenid
      } = CreateWasteSale;
    
      // Check if the required fields are provided
      if (!billdate || !whareid  ) {
        throw new Error("billdate, whareid, custid are required fields");
      }
    
     
      
      try {
        // Create a new bill sale instance
        const newBillSale = new billWasteModel({
          billdate,

          whareid,  // Assuming whareid is a valid ID
          custid,   // Assuming custid is a valid ID
          discount,
          saletax,
          shippingcharges,
          totalamount,
          billstatus,
          paymentstatus,
          paymentMode,
          cashreceived,
          receivedamount,
          notes,
          chefid,
          wastecart,
          invoiceNumberfbr,
          customerName,
          mobileNumber,
          deliveryAddress,
          riderName,
          riderid,
          waiterName,
          waiterid,
          tableName,
          tabileid,
          orderType,
          kitchenid,
          userid: userId,
          sellerid: sellerId, // Assign the sellerid obtained from the user
        });
    
        // Save the new bill sale
        const savedBillSale = await newBillSale.save();
    
        if (!savedBillSale) {
          throw new Error("Failed to create bill sale");
        }
    
        // Update stock levels for each item in salecart
        for (const item of wastecart) {
          const { id, quantity } = item;
    
          // Find or create stock entry for the warehouse and product
          let stock = await stockModel.findOne({ productId: id, warehouseId: whareid });
    
          if (!stock) {
            // If no stock entry exists, create a new one
            stock = new stockModel({ productId: id, warehouseId: whareid, quantity: -quantity, sellerid: sellerId });
          } else {
            // If stock entry exists, update the quantity
            stock.quantity -= quantity;
          }
    
          // Save the updated or new stock entry
          await stock.save();
        }
        
        // Fetch and populate referenced documents for whareid and custid
        const populatedBillSale = await billWasteModel.findById(savedBillSale._id).populate('whareid');
    
        return {
          ...populatedBillSale._doc,
          createdAt: populatedBillSale.createdAt.toISOString(),
        };
      } catch (error) {
        throw new Error(`Error creating bill sale: ${error.message}`);
      }
    }, 
    createBillSale: async (_, { CreateBillSale }, context) => {
      const { userId, sellerId } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
    
      const {
        billdate, whareid, custid, discount, saletax, shippingcharges,
        totalamount, billstatus, paymentstatus, paymentMode, cashreceived, receivedamount,
        notes, invoiceNumberfbr, salecart, customerName, mobileNumber, deliveryAddress,
        riderName, riderid, waiterName, waiterid, tableName, tabileid,chefid, orderType,kitchenid
      } = CreateBillSale;
    
      // Check if the required fields are provided
      if (!billdate || !whareid || !custid ) {
        throw new Error("billdate, whareid, custid are required fields");
      }
    
      // Find the maximum saleid in the database
      //const maxItem = await billSaleModel.findOne({}, { saleid: 1 }).sort({ 'saleid': -1 });
      //let newCode = maxItem && maxItem.saleid ? parseInt(maxItem.saleid) + 1 : 1;
      
      try {
        // Create a new bill sale instance
        const newBillSale = new billSaleModel({
          billdate,
          whareid,  // Assuming whareid is a valid ID
          custid,   // Assuming custid is a valid ID
          discount,
          saletax,
          shippingcharges,
          totalamount,
          billstatus,
          paymentstatus,
          paymentMode,
          cashreceived,
          receivedamount,
          notes,
          chefid,
          salecart,
          invoiceNumberfbr,
          customerName,
          mobileNumber,
          deliveryAddress,
          riderName,
          riderid,
          waiterName,
          waiterid,
          tableName,
          tabileid,
          orderType,
          kitchenid,
          userid: userId,
          sellerid: sellerId, // Assign the sellerid obtained from the user
        });
    
        // Save the new bill sale
        const savedBillSale = await newBillSale.save();
    
        if (!savedBillSale) {
          throw new Error("Failed to create bill sale");
        }
    
        // Update stock levels for each item in salecart
        for (const item of salecart) {
          const { id, quantity } = item;
    
          // Find or create stock entry for the warehouse and product
          let stock = await stockModel.findOne({ productId: id, warehouseId: whareid });
    
          if (!stock) {
            // If no stock entry exists, create a new one
            stock = new stockModel({ productId: id, warehouseId: whareid, quantity: -quantity, sellerid: sellerId });
          } else {
            // If stock entry exists, update the quantity
            stock.quantity -= quantity;
          }
    
          // Save the updated or new stock entry
          await stock.save();
        }
        if (tabileid) {
          if (billstatus === "ordered") {
              await tableModel.findByIdAndUpdate(tabileid, { reserved: true });
          } else {
              await tableModel.findByIdAndUpdate(tabileid, { reserved: false });
          }
         }
        // Fetch and populate referenced documents for whareid and custid
        const populatedBillSale = await billSaleModel.findById(savedBillSale._id).populate('whareid').populate('custid');
    
        return {
          ...populatedBillSale._doc,
          createdAt: populatedBillSale.createdAt.toISOString(),
        };
      } catch (error) {
        throw new Error(`Error creating bill sale: ${error.message}`);
      }
    },        
    updateBillSale: async (_, { id, UpdateBillSale }, context) => {
      try {
        const { userId, sellerId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }
        const {
          billdate, whareid, custid, discount, saletax, shippingcharges,
          totalamount, billstatus, paymentstatus, paymentMode, cashreceived, receivedamount,
          notes, invoiceNumberfbr, salecart, customerName, mobileNumber, deliveryAddress,
          riderName, riderid, waiterName, waiterid, tableName, tabileid,chefid, orderType,kitchenid
        } = UpdateBillSale;
        const previousBillSale = await billSaleModel.findById(id);
    
        if (!previousBillSale) {
          throw new Error("Bill sale not found");
        }
    
        // Update stock based on the previous sale cart
        for (const item of previousBillSale.salecart) {
          const { id: productId, quantity: previousQuantity } = item;
          let stock = await stockModel.findOne({ productId, warehouseId: previousBillSale.whareid }); // Fix: use previousBillSale.whareid
          if (stock) {
            stock.quantity += previousQuantity;
            await stock.save();
          }
        }
    
        // Update the bill sale
        const updatedBillSale = await billSaleModel
          .findByIdAndUpdate(id, { $set: UpdateBillSale }, { new: true })
          .populate('whareid', '_id name')
          .populate('custid', '_id name phoneNumber');
    
        // Calculate and update stock changes based on the updated sale cart
        for (const item of salecart) {
          const { id, quantity } = item;
          let stock = await stockModel.findOne({ productId: id, warehouseId: whareid });
          if (!stock) {
            stock = new stockModel({ productId: id, warehouseId: whareid, quantity: -quantity, sellerid: sellerId });
          } else {
            stock.quantity -= quantity;
          }
          await stock.save();
        }
        if (tabileid) {
          if (billstatus === "ordered") {
              await tableModel.findByIdAndUpdate(tabileid, { reserved: true });
          } else {
              await tableModel.findByIdAndUpdate(tabileid, { reserved: false });
          }
         }
        return updatedBillSale;
      } catch (error) {
        throw new Error(`Error updating bill sale: ${error.message}`);
      }
    },       
    updateBillSaleCash: async (_, { id, cashReceived }, context) => {
      try {
        const { userId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }

        // Find the BillPurchase by ID
        const billPurchase = await billSaleModel.findById(id);

        if (!billPurchase) {
          throw new Error("BillPurchase not found");
        }

        // Calculate the difference between the total amount and the previous cash received
        const previousCashReceived = billPurchase.cashreceived || 0;
        const totalAmount = billPurchase.totalamount || 0;
        const remainingAmount = totalAmount - previousCashReceived;

        // Update the cashReceived field
        const updatedCashReceived = previousCashReceived + cashReceived;
        if (updatedCashReceived > totalAmount) {
          throw new Error("Cash received cannot exceed the remaining amount");
        }

        // Find the BillPurchase by ID and update the cashReceived field
        const updatedBillPurchase = await billSaleModel.findByIdAndUpdate(
          id,
          { cashreceived: updatedCashReceived },
          { new: true }
        );

        return {
          message: "Cash received updated successfully",
          //billPurchase: updatedBillPurchase
        };
      } catch (error) {
        throw new Error("Unable to update cash received for BillPurchase: " + error.message);
      }
    },
    deleteBillSale: async (_, { id }, context) => {
      const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }
    
      try {
        // Find the bill sale to be deleted
        const billSale = await billSaleModel.findById(id);
        if (!billSale) {
          throw new Error("Bill sale not found");
        }
       // Delete the bill sale
        await billSaleModel.findByIdAndDelete(id);
        // Restore stock for each item in the deleted bill sale
        for (const item of billSale.salecart) {
          const { id: productId, quantity } = item; // Changed 'id' to 'productId'
    
          // Find the stock entry for the warehouse and product
          let stock = await stockModel.findOne({ productId, warehouseId: billSale.whareid }); // Changed 'id' to 'productId'
    
          if (stock) {
            // If stock entry exists, update the quantity
            stock.quantity += quantity;
            await stock.save(); // Moved the save operation inside the if block
          }
        }
   
       
    
        return "Bill sale deleted successfully";
      } catch (error) {
        throw new Error(`Error deleting bill sale: ${error.message}`);
      }
    },    
    createReturnBillSale: async (_, { CreateReturnBillSale }, context) => {
      const { userId, sellerId } = context;

      if (!userId) {
        throw new Error("You must be logged in");
      }

      // Destructure all properties from CreateReturnBillSale input
      const { billdate, whareid, custid, discount, saletax, shippingcharges, totalamount, billstatus, paymentstatus, paymentMode, cashreceived, notes, returncart } = CreateReturnBillSale;

      // Check if the required fields are provided
      if (!billdate || !whareid || !custid) {
        throw new Error("billdate, whareid, and custid are required fields");
      }
      
      
      try {
        // Create a new bill sale model instance
        const newBillSale = new billSaleReturnModel({
          billdate,

          whareid: whareid, // Assuming whareid is a valid ID
          custid: custid,   // Assuming custid is a valid ID
          discount,
          saletax,
          shippingcharges,
          totalamount,
          billstatus,
          paymentstatus,
          paymentMode,
          notes,
          returncart,
          cashreceived,
          userid: userId,
          sellerid: sellerId,
        });

        // Save the new bill sale
        const savedBillSale = await newBillSale.save();

        if (!savedBillSale) {
          throw new Error("Failed to create return bill sale");
        }
        try {
          for (const item of returncart) {
            const { id, quantity } = item; // Extract id, quantity, and whareid from each item

            // Find the stock entry for the warehouse and product
            let stock = await stockModel.findOne({ productId: id, warehouseId: whareid });

            if (!stock) {
              // If no stock entry exists, create a new one
              stock = new stockModel({ productId: id, warehouseId: whareid, quantity, sellerid: sellerId });
            } else {
              // If stock entry exists, update the quantity
              stock.quantity += quantity;
            }

            // Save the updated or new stock entry
            await stock.save();
          }

          //console.log("Stocks updated successfully");
        } catch (error) {
          console.error("Error updating stocks:", error);
          throw new Error(`Error updating stocks: ${error.message}`);
        }
        // Populate referenced documents for warehouse (whareid) and customer (custid)
        const populatedBillSale = await billSaleReturnModel.findById(savedBillSale._id).populate('whareid').populate('custid');

        return {
          ...populatedBillSale._doc,
          createdAt: populatedBillSale.createdAt.toISOString(),
        };
      } catch (error) {
        throw new Error(`Error creating return bill sale: ${error.message}`);
      }
    },
    updateReturnBillSale: async (_, { id, UpdateReturnBillSale }, context) => {
      try {
        const { userId, sellerId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }
        const { whareid, returncart } = UpdateReturnBillSale;
        const previousBillSale = await billSaleReturnModel.findById(id);
    
        if (!previousBillSale) {
          throw new Error("Bill sale not found");
        }
    
        // Update stock based on the previous sale cart
        for (const item of previousBillSale.returncart) {
          const { id: productId, quantity: previousQuantity } = item;
          let stock = await stockModel.findOne({ productId, warehouseId: previousBillSale.whareid }); // Fix: use previousBillSale.whareid
          if (stock) {
            stock.quantity -= previousQuantity;
            await stock.save();
          }
        }
    
        // Update the bill sale
        const updatedReturnBillSale = await billSaleReturnModel
          .findByIdAndUpdate(id, { $set: UpdateReturnBillSale }, { new: true })
          .populate('whareid', '_id name')
          .populate('custid', '_id name phoneNumber');
    
        // Calculate and update stock changes based on the updated sale cart
        for (const item of returncart) {
          const { id, quantity } = item;
          let stock = await stockModel.findOne({ productId: id, warehouseId: whareid });
          if (!stock) {
            stock = new stockModel({ productId: id, warehouseId: whareid, quantity: quantity, sellerid: sellerId });
          } else {
            stock.quantity += quantity;
          }
          await stock.save();
        }
    
        return updatedReturnBillSale;
      } catch (error) {
        throw new Error(`Error updating bill sale: ${error.message}`);
      }
    },
    updateBillSaleReturnCash: async (_, { id, cashReceived }, context) => {
      try {
        const { userId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }

        // Find the BillPurchase by ID
        const billPurchase = await billSaleReturnModel.findById(id);

        if (!billPurchase) {
          throw new Error("BillPurchase not found");
        }

        // Calculate the difference between the total amount and the previous cash received
        const previousCashReceived = billPurchase.cashreceived || 0;
        const totalAmount = billPurchase.totalamount || 0;
        const remainingAmount = totalAmount - previousCashReceived;

        // Update the cashReceived field
        const updatedCashReceived = previousCashReceived + cashReceived;
        if (updatedCashReceived > totalAmount) {
          throw new Error("Cash received cannot exceed the remaining amount");
        }

        // Find the BillPurchase by ID and update the cashReceived field
        const updatedBillPurchase = await billSaleReturnModel.findByIdAndUpdate(
          id,
          { cashreceived: updatedCashReceived },
          { new: true }
        );

        return {
          message: "Cash received updated successfully",
          //billPurchase: updatedBillPurchase
        };
      } catch (error) {
        throw new Error("Unable to update cash received for BillPurchase: " + error.message);
      }
    },
    deleteReturnBillSale: async (_, { id }, context) => {
      const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }

      try {
        // Find the return bill sale to be deleted
        const returnBillSale = await billSaleReturnModel.findById(id);
        if (!returnBillSale) {
          throw new Error("Return bill sale not found");
        }

        // Delete the return bill sale
        await billSaleReturnModel.findByIdAndDelete(id);

        // Restore stock for each item in the deleted return bill sale
        for (const item of returnBillSale.returncart) {
          const { id, quantity } = item;

          // Find the stock entry for the warehouse and product
          let stock = await stockModel.findOne({ productId: id, warehouseId: returnBillSale.whareid });

          if (stock) {
            // If stock entry exists, update the quantity
            stock.quantity -= quantity;
          }

          // Save the updated or new stock entry
          await stock.save();
        }

        // console.log("Stocks updated successfully");

        return "Return bill sale deleted successfully";
      } catch (error) {
        throw new Error(`Error deleting return bill sale: ${error.message}`);
      }

    },
    createBillPurchase: async (_, { input }, context) => {
      const { userId, sellerId } = context;

      try {
        if (!userId) {
          throw new Error("You must be logged in");
        }

        // Destructure all properties from input
        const { billdate, whareid, custid, discount, saletax, shippingcharges, totalamount, cashreceived, billstatus, paymentstatus, paymentMode, notes, purchasecart } = input;

        // Check if the required fields are provided
        if (!billdate || !whareid || !custid) {
          throw new Error("billdate, whareid, and custid are required fields");
        }

      

        const newBillPurchase = new billPurchaseModel({
          billdate,
       
          whareid,
          custid,
          discount,
          saletax,
          shippingcharges,
          totalamount,
          cashreceived,
          billstatus,
          paymentstatus,
          paymentMode,
          notes,
          purchasecart,
          userid: userId,
          sellerid: sellerId,
        });

        const savedBillPurchase = await newBillPurchase.save();
        const populatedBillPurchase = await billPurchaseModel.findById(savedBillPurchase._id).populate('whareid').populate('custid');

        if (!populatedBillPurchase) {
          throw new Error("Failed to retrieve saved bill purchase");
        }
        try {
          for (const item of purchasecart) {
            const { id, quantity } = item; // Extract id, quantity, and whareid from each item

            // Find the stock entry for the warehouse and product
            let stock = await stockModel.findOne({ productId: id, warehouseId: whareid });

            if (!stock) {
              // If no stock entry exists, create a new one
              stock = new stockModel({ productId: id, warehouseId: whareid, quantity, sellerid: sellerId });
            } else {
              // If stock entry exists, update the quantity
              stock.quantity += quantity;
            }

            // Save the updated or new stock entry
            await stock.save();
          }

          // console.log("Stocks updated successfully");
        } catch (error) {
          console.error("Error updating stocks:", error);
          throw new Error(`Error updating stocks: ${error.message}`);
        }
        for (const item of purchasecart) {
          const { id, price } = item;

          // Find the item in itemsModel
          const itemToUpdate = await itemsModel.findById(id);

          if (!itemToUpdate) {
            throw new Error(`Item with ID ${id} not found in itemsModel`);
          }

          // Update the cost of the item
          itemToUpdate.cost = price;

          // Save the updated item
          await itemToUpdate.save();
        }
        return {
          ...populatedBillPurchase._doc,
          createdAt: populatedBillPurchase.createdAt.toISOString(),
        };
      } catch (error) {
        console.error(`Error creating bill purchase: ${error.message}`);
        throw new Error(`Error creating bill purchase: ${error.message}`);
      }
    },
    updateBillPurchase: async (_, { id, input }, context) => {
      try {
        const { userId, sellerId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }
        const { whareid, purchasecart } = input;
        const previousBillSale = await billPurchaseModel.findById(id);
    
        if (!previousBillSale) {
          throw new Error("Bill sale not found");
        }
    
        // Update stock based on the previous sale cart
        for (const item of previousBillSale.purchasecart) {
          const { id: productId, quantity: previousQuantity } = item;
          let stock = await stockModel.findOne({ productId, warehouseId: previousBillSale.whareid }); // Fix: use previousBillSale.whareid
          if (stock) {
            stock.quantity -= previousQuantity;
            await stock.save();
          }
        }
    
        // Update the bill sale
        const updatedBillPurchase = await billPurchaseModel
          .findByIdAndUpdate(id, { $set: input }, { new: true })
          .populate('whareid', '_id name')
          .populate('custid', '_id name phoneNumber');
    
        // Calculate and update stock changes based on the updated sale cart
        for (const item of purchasecart) {
          const { id, quantity } = item;
          let stock = await stockModel.findOne({ productId: id, warehouseId: whareid });
          if (!stock) {
            stock = new stockModel({ productId: id, warehouseId: whareid, quantity: quantity, sellerid: sellerId });
          } else {
            stock.quantity += quantity;
          }
          await stock.save();
        }
      // Update the cost of items in itemsModel based on purchasecart price
        for (const item of purchasecart) {
          const { id, price } = item;
          const itemToUpdate = await itemsModel.findById(id);

          if (!itemToUpdate) {
            throw new Error(`Item with ID ${id} not found in itemsModel`);
          }

          itemToUpdate.cost = price;
          await itemToUpdate.save();
        }

    return updatedBillPurchase;
      } catch (error) {
        throw new Error(`Error updating bill purchase: ${error.message}`);
      }
    },
    updateBillPurchaseCash: async (_, { id, cashReceived }, context) => {
      try {
        const { userId, sellerId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }

        // Find the BillPurchase by ID
        const billPurchase = await billPurchaseModel.findById(id);

        if (!billPurchase) {
          throw new Error("BillPurchase not found");
        }

        // Calculate the difference between the total amount and the previous cash received
        const previousCashReceived = billPurchase.cashreceived || 0;
        const totalAmount = billPurchase.totalamount || 0;
        const remainingAmount = totalAmount - previousCashReceived;

        // Update the cashReceived field
        const updatedCashReceived = previousCashReceived + cashReceived;
        if (updatedCashReceived > totalAmount) {
          throw new Error("Cash received cannot exceed the remaining amount");
        }

        // Find the BillPurchase by ID and update the cashReceived field
        const updatedBillPurchase = await billPurchaseModel.findByIdAndUpdate(
          id,
          { cashreceived: updatedCashReceived },
          { new: true }
        );

        return {
          message: "Cash received updated successfully",
          //billPurchase: updatedBillPurchase
        };
      } catch (error) {
        throw new Error("Unable to update cash received for BillPurchase: " + error.message);
      }
    },
    deleteBillPurchase: async (_, { id }, context) => {
      const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }

      try {
        // Find the bill purchase return to be deleted
        const billPurchase = await billPurchaseModel.findById(id);
        if (!billPurchase) {
          throw new Error("Bill purchase return not found");
        }

        // Delete the bill purchase return
        await billPurchaseModel.findByIdAndDelete(id);

        // Restore stock for each item in the deleted bill purchase return
        for (const item of billPurchase.purchasecart) {
          const { id, quantity } = item;

          // Find the stock entry for the warehouse and product
          let stock = await stockModel.findOne({ productId: id, warehouseId: billPurchase.whareid });
          if (stock) {
            stock.quantity -= quantity;
          }

          // Save the updated or new stock entry
          await stock.save();
        }
       
        // console.log("Stocks updated successfully");

        return "Bill purchase deleted successfully";
      } catch (error) {
        throw new Error(`Error deleting bill purchase return: ${error.message}`);
      }
    },
    createBillPurchaseReturn: async (_, { input }, context) => {
      const { userId, sellerId } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }

      // Destructure all properties from input
      const { billdate, whareid, custid, discount, saletax, shippingcharges, totalamount, cashreceived, billstatus, paymentstatus, paymentMode, notes, purreturncart } = input;

      // Check if the required fields are provided 
      if (!billdate || !whareid || !custid) {
        throw new Error("billdate, whareid, and custid are required fields");
      }
     
   
      try {
        const newBillPurchasereturn = new billPurchaseReturnModel({
          billdate,

          whareid: whareid,
          custid: custid,
          discount,
          saletax,
          shippingcharges,
          totalamount,
          cashreceived,
          billstatus,
          paymentstatus,
          paymentMode,
          notes,
          purreturncart,
          userid: userId,
          sellerid: sellerId, // Assign the sellerid obtained from the user
        });

        // Save the new bill purchase
        const savedBillPurchase = await newBillPurchasereturn.save();
        const populatedBillPurchase = await billPurchaseReturnModel.findById(savedBillPurchase._id).populate('whareid').populate('custid');

        if (!populatedBillPurchase) {
          throw new Error("Failed to retrieve saved bill purchase");
        }
        try {
          for (const item of purreturncart) {
            const { id, quantity } = item; // Extract id, quantity, and whareid from each item

            // Find the stock entry for the warehouse and product
            let stock = await stockModel.findOne({ productId: id, warehouseId: whareid });

            if (!stock) {
              // If no stock entry exists, create a new one
              stock = new stockModel({ productId: id, warehouseId: whareid, quantity: -quantity, sellerid: sellerId });

            } else {
              // If stock entry exists, update the quantity
              stock.quantity -= quantity;
            }

            // Save the updated or new stock entry
            await stock.save();
          }

          //console.log("Stocks updated successfully");
        } catch (error) {
          console.error("Error updating stocks:", error);
          throw new Error(`Error updating stocks: ${error.message}`);
        }

        return {
          ...populatedBillPurchase._doc,
          createdAt: populatedBillPurchase.createdAt.toISOString(),
        };
      } catch (error) {
        throw new Error(`Error creating bill purchase: ${error.message}`);
      }
    },
    updateBillPurchaseReturn: async (_, { id, input }, context) => {
      try {
        const { userId, sellerId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }
        const { whareid, purreturncart } = input;
        const previousBillPurchaseReturn = await billPurchaseReturnModel.findById(id);
    
        if (!previousBillPurchaseReturn) {
          throw new Error("Bill purchase return not found");
        }
    
        // Update stock based on the previous purchase return cart
        for (const item of previousBillPurchaseReturn.purreturncart) {
          const { id: productId, quantity: previousQuantity } = item;
          let stock = await stockModel.findOne({ productId, warehouseId: previousBillPurchaseReturn.whareid });
          if (stock) {
            stock.quantity += previousQuantity;
            await stock.save();
          }
        }
    
        // Update the bill purchase return
        const updatedBillPurchaseReturn = await billPurchaseReturnModel
          .findByIdAndUpdate(id, { $set: input }, { new: true })
          .populate('whareid', '_id name')
          .populate('custid', '_id name phoneNumber');
    
        // Calculate and update stock changes based on the updated purchase return cart
        for (const item of purreturncart) {
          const { id, quantity } = item;
          let stock = await stockModel.findOne({ productId: id, warehouseId:whareid});
          if (!stock) {
            stock = new stockModel({ productId: id, warehouseId:whareid, quantity: -quantity, sellerid: sellerId });
          } else {
            stock.quantity -= quantity;
          }
          await stock.save();
        }
    
        return updatedBillPurchaseReturn;
      } catch (error) {
        throw new Error(`Error updating bill purchase return: ${error.message}`);
      }
    },    
    updateBillPurchaseReturnCash: async (_, { id, cashReceived }, context) => {
      try {
        const { userId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }

        // Find the BillPurchase by ID
        const billPurchase = await billPurchaseReturnModel.findById(id);

        if (!billPurchase) {
          throw new Error("BillPurchase not found");
        }

        // Calculate the difference between the total amount and the previous cash received
        const previousCashReceived = billPurchase.cashreceived || 0;
        const totalAmount = billPurchase.totalamount || 0;
        const remainingAmount = totalAmount - previousCashReceived;

        // Update the cashReceived field
        const updatedCashReceived = previousCashReceived + cashReceived;
        if (updatedCashReceived > totalAmount) {
          throw new Error("Cash received cannot exceed the remaining amount");
        }

        // Find the BillPurchase by ID and update the cashReceived field
        const updatedBillPurchase = await billPurchaseReturnModel.findByIdAndUpdate(
          id,
          { cashreceived: updatedCashReceived },
          { new: true }
        );

        return {
          message: "Cash received updated successfully",
          //billPurchase: updatedBillPurchase
        };
      } catch (error) {
        throw new Error("Unable to update cash received for BillPurchase: " + error.message);
      }
    },
    deleteBillPurchaseReturn: async (_, { id }, context) => {
      const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }

      try {
        // Find the bill purchase return to be deleted
        const billPurchaseReturn = await billPurchaseReturnModel.findById(id);
        if (!billPurchaseReturn) {
          throw new Error("Bill purchase return not found");
        }
      // Delete the bill purchase return
      await billPurchaseReturnModel.findByIdAndDelete(id);
            
        // Restore stock for each item in the deleted bill purchase return
        for (const item of billPurchaseReturn.purreturncart) {
          const { id, quantity } = item;

          // Find the stock entry for the warehouse and product
          let stock = await stockModel.findOne({ productId: id, warehouseId: billPurchaseReturn.whareid });

          if (stock) {
            // If stock entry exists, update the quantity
            stock.quantity += quantity;
          }

          // Save the updated or new stock entry
          await stock.save();
        }
       

        // console.log("Stocks updated successfully");

        return "Bill purchase return deleted successfully";
      } catch (error) {
        throw new Error(`Error deleting bill purchase return: ${error.message}`);
      }
    },
    createBillQuotation: async (_, { input }, context) => {
      const { userId, sellerId } = context;

      if (!userId) {
        throw new Error("You must be logged in");
      }

      const { billdate, whareid, custid, discount, saletax, shippingcharges, totalamount, billstatus, cashreceived, paymentstatus, paymentMode, notes, ordercart } = input;

      if (!billdate || !whareid || !custid) {
        throw new Error("billdate, whareid, and custid are required fields");
      }
     
     
    
      try {
        const newBillQuotation = new billOrdersModel({
          billdate,
        
          whareid: whareid,
          custid: custid,
          discount,
          saletax,
          shippingcharges,
          totalamount,
          billstatus,
          paymentstatus,
          paymentMode,
          notes,
          ordercart,
          cashreceived,
          userid: userId,
          sellerid: sellerId,
        });

        const savedBillQuotation = await newBillQuotation.save();

        const populatedBillQuotation = await billOrdersModel.findById(savedBillQuotation._id).populate('whareid').populate('custid');

        return {
          ...populatedBillQuotation._doc,
          createdAt: populatedBillQuotation.createdAt.toISOString(),
        };
      } catch (error) {
        throw new Error(`Error creating bill quotation: ${error.message}`);
      }
    },
    deleteBillQuotation: async (_, { id }, context) => {
      const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }

      await billOrdersModel.findByIdAndDelete(id);

      return "Bill quotation deleted successfully";
    },
    createBillTransfer: async (_, { input }, context) => {
      const { userId, sellerId } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
    
      // Destructure all properties from input
      const { billdate, whareid, custid, discount, saletax, shippingcharges, totalamount, cashreceived, billstatus, paymentstatus, paymentMode, notes, transfercart } = input;
    
      // Check if the required fields are provided 
      if (!billdate || !whareid || !custid) {
        throw new Error("billdate, whareid, and custid are required fields");
      }
    
      try {
        const newBilltransfer = new billTransfersModel({
          billdate,
         
          whareid: whareid,
          custid: custid,
          discount,
          saletax,
          shippingcharges,
          totalamount,
          cashreceived,
          billstatus,
          paymentstatus,
          paymentMode,
          notes,
          transfercart,
          userid: userId,
          sellerid: sellerId, // Assign the sellerid obtained from the user
        });
    
        // Save the new bill purchase
        const savedBilltransfer = await newBilltransfer.save();
    
        // Update stock for each item in the transfercart
        for (const item of transfercart) {
          const { id: productId, quantity } = item;
    
          // Deduct the transferred quantity from the source warehouse
          let sourceStock = await stockModel.findOne({ productId, warehouseId: whareid });
          if (!sourceStock) {
            // If no stock entry exists for the product in the source warehouse, create a new one with negative quantity
            sourceStock = new stockModel({ productId, warehouseId: whareid, quantity: -quantity, sellerid: sellerId });
          } else {
            // If stock entry exists, deduct the transferred quantity
            sourceStock.quantity -= quantity;
          }

            await sourceStock.save();
        
    
          // Update or create the destination stock
          let destinationStock = await stockModel.findOne({ productId, warehouseId: custid });
          if (!destinationStock) {
            // If no stock entry exists for the product in the destination warehouse, create a new one
            destinationStock = new stockModel({ productId, warehouseId: custid, quantity, sellerid: sellerId });
          } else {
            // If stock entry exists, update the quantity
            destinationStock.quantity += quantity;
          }
          await destinationStock.save();
        }
    
        const populatedBilltransfer = await billTransfersModel.findById(savedBilltransfer._id).populate('whareid').populate('custid');
    
        return {
          ...populatedBilltransfer._doc,
          createdAt: populatedBilltransfer.createdAt.toISOString(),
        };
      } catch (error) {
        throw new Error(`Error creating bill Transfer: ${error.message}`);
      }
    },    
    deleteBillTransfer: async (_, { id }, context) => {
      const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }
    
      try {
        // Find the bill transfer to be deleted
        const billTransfer = await billTransfersModel.findById(id);
        if (!billTransfer) {
          throw new Error("Bill transfer not found");
        }
    
        // Delete the bill transfer
        await billTransfersModel.findByIdAndDelete(id);
    
        // Reverse the stock transfer for each item in the transfer cart
        for (const item of billTransfer.transfercart) {
          const { id: productId, quantity } = item;
    
          // Deduct the transferred quantity from the source warehouse
          let sourceStock = await stockModel.findOne({ productId, warehouseId: billTransfer.whareid });
          if (sourceStock) {
            sourceStock.quantity += quantity;
            await sourceStock.save();
          }
    
          // Add the transferred quantity to the destination warehouse
          let destinationStock = await stockModel.findOne({ productId, warehouseId: billTransfer.custid });
          if (destinationStock) {
            // If stock entry exists, update the quantity
            destinationStock.quantity -= quantity;
            await destinationStock.save();
          }
        }
    
        return "Bill Transfer deleted successfully";
      } catch (error) {
        throw new Error(`Error deleting bill transfer: ${error.message}`);
      }
    },
    createBillAdjustment: async (_, { input }, context) => {
        const { userId, sellerId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }

        // Destructure all properties from input
        const { billdate, whareid, custid, discount, saletax, shippingcharges, totalamount, billstatus, cashreceived, paymentstatus, paymentMode, notes, adjustcart } = input;

        // Check if the required fields are provided 
        if (!billdate || !whareid) {
          throw new Error("billdate and whareid are required fields");
        }

        try {
       
    
          // Create a new bill adjustment
          const newBillAdjustment = new billAdjustmentsModel({
            billdate,
         
            whareid,
            custid,
            discount,
            cashreceived,
            saletax,
            shippingcharges,
            totalamount,
            billstatus,
            paymentstatus,
            paymentMode,
            notes,
            adjustcart,
            userid: userId,
            sellerid: sellerId,
          });

          // Save the new bill adjustment
          const savedBillAdjustment = await newBillAdjustment.save();

          // Update stock based on adjustment type in adjustcart
            for (const item of adjustcart) {
              const { id, quantity, adjusttype } = item;

              // Find the stock entry for the product in the warehouse
              let stock = await stockModel.findOne({ productId: id, warehouseId: whareid });
              if (!stock) {
                // If stock entry doesn't exist, create a new one
                stock = new stockModel({ productId: id, warehouseId: whareid, quantity, sellerid: sellerId });
              } else {
                // Adjust stock based on adjustment type
                if (adjusttype === "addition") {
                  stock.quantity += quantity;
                } else if (adjusttype === "subtraction") {
                  stock.quantity -= quantity;
                } else {
                  throw new Error(`Invalid adjustment type for product ${id}`);
                }
              }

              // Save the updated stock
              await stock.save();
            }


          // Populate and return the created bill adjustment
          const populatedBillAdjustment = await billAdjustmentsModel.findById(savedBillAdjustment._id).populate('whareid');

          return {
            ...populatedBillAdjustment._doc,
            createdAt: populatedBillAdjustment.createdAt.toISOString(),
          };
        } catch (error) {
          throw new Error(`Error creating bill adjustment: ${error.message}`);
        }
    },
    deleteBillAdjustment: async (_, { id }, context) => {
      const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }

      try {
        // Find the bill adjustment to be deleted
        const billAdjustment = await billAdjustmentsModel.findById(id);
        if (!billAdjustment) {
          throw new Error("Bill adjustment not found");
        }
        // Delete the bill adjustment
        await billAdjustmentsModel.findByIdAndDelete(id);

        // Reverse the stock adjustments made during the creation of the bill adjustment
        for (const item of billAdjustment.adjustcart) {
          const { id: productId, quantity, adjusttype } = item;

          // Find the stock entry for the product in the warehouse
          let stock = await stockModel.findOne({ productId, warehouseId: billAdjustment.whareid });
          if (!stock) {
            // throw new Error(`Stock not found for product ${productId} in warehouse ${billAdjustment.whareid}`);
          }

          // Reverse the stock adjustments based on the original adjustment type
          if (adjusttype === "addition") {
            stock.quantity -= quantity;
          } else if (adjusttype === "subtraction") {
            stock.quantity += quantity;
          } else {
            throw new Error(`Invalid adjustment type for product ${productId}`);
          }

          // Save the updated stock
          await stock.save();
        }

       
        return "Bill Adjustment deleted successfully";
      } catch (error) {
        throw new Error(`Error deleting bill adjustment: ${error.message}`);
      }
    },
    createProject: async (_, { input }, context) => {
      const { userId, sellerId } = context;
      if (!userId) {
        throw new Error('You must be logged in.');
      }

      // Destructure properties from input
      const { title, description, startDate, endDate, status } = input;

      // Check if required fields are provided
      if (!title || !startDate || !endDate) {
        throw new Error('Title, startDate, and endDate are required fields');
      }

      try {
        const newProject = new ProjectModel({
          title,
          description,
          startDate,
          endDate,
          status,
          userid: userId,
          sellerid: sellerId, // Assign the sellerid obtained from the user
        });

        const savedProject = await newProject.save();

        return {
          ...savedProject._doc,
          createdAt: savedProject.createdAt.toISOString(),
        };
      } catch (error) {
        throw new Error(`Error creating project: ${error.message}`);
      }
    },
    deleteProject: async (_, { id }, context) => {
      const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }

      await ProjectModel.findByIdAndDelete(id);

      return "Project deleted successfully";
    },
    deleteTask: async (_, { id }, context) => {
      const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }

      await TaskModel.findByIdAndDelete(id);

      return "Task deleted successfully";
    },
    createTask: async (_, { input }, context) => {
      const { userId, sellerId } = context;
      if (!userId) {
        throw new Error('You must be logged in.');
      }

      // Destructure properties from input
      const { title, description, dueDate, status, projectId } = input;

      // Check if required fields are provided
      if (!title || !dueDate || !projectId) {
        throw new Error('Title, dueDate, and projectId are required fields');
      }

      try {
        // Check if the project exists
        const existingProject = await ProjectModel.findById(projectId);
        if (!existingProject) {
          throw new Error('Project not found.');
        }

        // Create a new task with sellerid
        const newTask = new TaskModel({
          title,
          description,
          dueDate,
          status,
          projectid: projectId,
          userid: userId,
          sellerid: sellerId, // Assign the sellerid obtained from the user
        });

        // Save the task
        const savedTask = await newTask.save();

        return {
          ...savedTask._doc,
          createdAt: savedTask.createdAt.toISOString(),
        };
      } catch (error) {
        throw new Error(`Error creating task: ${error.message}`);
      }
    },
    updateProjectStatus: async (_, { id, status }, context) => {
      // Add logic to update the project status in the database
      const { userId } = context;

      if (!userId) {
        throw new Error('You must be logged in.');
      }
      const updatedProject = await ProjectModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      return updatedProject;
    },
    updateTaskStatus: async (_, { id, status }, context) => {
      // Add logic to update the project status in the database
      const { userId } = context;

      if (!userId) {
        throw new Error('You must be logged in.');
      }
      const updatedTask = await TaskModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      return updatedTask;
    },
    createExpenseEntry: async (_, { input }, context) => {
      const { userId, sellerId } = context;
      if (!userId) {
        throw new Error('You must be logged in.');
      }

      // Destructure properties from input
      const { date, notes, wareid, cateid, amount } = input;

      // Check if required fields are provided
      if (!cateid || !amount || !wareid) {
        throw new Error('Category and amount are required fields');
      }

      try {
        const newExpenseEntry = new ExpenseEntryModel({
          date,
          notes,
          wareid,
          cateid,
          amount,
          userid: userId,
          sellerid: sellerId, // Assign the sellerid obtained from the user
        });

        const savedExpenseEntry = await newExpenseEntry.save();

        return {
          ...savedExpenseEntry._doc,
          date: savedExpenseEntry.date.toISOString(),
        };
      } catch (error) {
        throw new Error(`Error creating expense entry: ${error.message}`);
      }
    },
    updateExpenseEntry: async (_, { id, input }, context) => {
      try {
        const { userId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }

        const updatedExpenseEntryResult = await ExpenseEntryModel.findByIdAndUpdate(
          id,
          { $set: input },
          { new: true }
        );

        return updatedExpenseEntryResult;
      } catch (error) {
        throw new Error(`Error updating expense entry: ${error.message}`);
      }
    },
    deleteExpenseEntry: async (_, { id }, context) => {
      const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }

      await ExpenseEntryModel.findByIdAndDelete(id);

      return 'Expense entry deleted successfully';
    },
    createPartyEntry: async (_, { input }, context) => {
      const { userId, sellerId } = context;
      if (!userId) {
        throw new Error('You must be logged in.');
      }

      // Destructure properties from input
      let { name, email, phoneNumber, country, city, address,partytype, acctype } = input;

      // Check if required fields are provided
      if (!name || !phoneNumber) {
        throw new Error('Name and phone number are required');
      }

      try {
        // Convert the name to lowercase for case-insensitive comparison
        name = name.toLowerCase();

        // Check if a party entry with the same name already exists for the given sellerId (case-insensitive)
        const existingPartyEntry = await partyEntryModel.findOne({
          name: { $regex: new RegExp('^' + name + '$', 'i') },
          sellerid: sellerId,
          acctype: acctype // Assuming acctype is the variable representing the account type you want to search for
        });

        if (existingPartyEntry) {
          throw new Error('Party entry with the same name and account type already exists for this seller.');
        }


        const newPartyEntry = new partyEntryModel({
          name,
          email,
          phoneNumber,
          country,
          city,
          address,
          partytype,
          acctype: acctype || 'customers', // Set default value if not provided
          userid: userId,
          sellerid: sellerId, // Assign the sellerid obtained from the user
        });

        const savedPartyEntry = await newPartyEntry.save();

        return {
          ...savedPartyEntry._doc,
          // Format any date fields here if needed
        };
      } catch (error) {
        throw new Error(`Error creating party entry: ${error.message}`);
      }
    },
    updatePartyEntry: async (_, { id, input }, context) => {
      try {
        const { userId, sellerId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }

        const { name, acctype } = input;
        let lowercaseName = name.toLowerCase();

        // Check if a party entry with the same name already exists for the given sellerId (case-insensitive)
        const existingPartyEntry = await partyEntryModel.findOne({
          name: { $regex: new RegExp('^' + name + '$', 'i') },
          sellerid: sellerId,
          acctype: acctype // Assuming acctype is the variable representing the account type you want to search for
        });

        // if (existingPartyEntry) {
        //  throw new Error('Party entry with the same name and account type already exists for this seller.');
        //}
        if (existingPartyEntry && existingPartyEntry._id.toString() !== id) {
          throw new Error('A party entry with the same name and account type already exists for this seller.');
        }

        // Update the party entry
        const updatedPartyEntryResult = await partyEntryModel.findByIdAndUpdate(
          id,
          { $set: { ...input, name: lowercaseName } },
          { new: true }
        );

        return updatedPartyEntryResult;
      } catch (error) {
        throw new Error(`Error updating party entry: ${error.message}`);
      }
    },
    deletePartyEntry: async (_, { id }, context) => {
      const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }
      const itemCounts = await billSaleModel.countDocuments({ custid: id });

      if (itemCounts > 0) {
        throw new Error("Cannot delete sale as it is referenced in itemModel");
      }
      // Count the number of items associated with the unit ID
      const itemCount = await billPurchaseModel.countDocuments({ custid: id });

      if (itemCount > 0) {
        throw new Error("Cannot delete sale as it is referenced in itemModel");
      }
      await partyEntryModel.findByIdAndDelete(id);

      return 'Party entry deleted successfully';
    },
    updateSeller: async (_, { id, input }, context) => {
      try {
        const { userId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }

        const updatedSellerResult = await sellerModel.findByIdAndUpdate(
          id,
          { $set: input },
          { new: true }
        );

        return updatedSellerResult;
      } catch (error) {
        throw new Error(`Error updating seller: ${error.message}`);
      }
    },
    addKitchen: async (_, { addNewKitchen }, context) => {
      try {
        const { userId, sellerId } = context;
        const { name, description, categoryIds } = addNewKitchen;

        if (!userId) {
          throw new Error("You must be logged in");
        }

        if (!name) {
          throw new Error("Name is required");
        }

        const lowerCaseName = name.toLowerCase();
        const existingKitchen = await kitchenModel.findOne({
          name: { $regex: new RegExp('^' + lowerCaseName + '$', 'i') },
          sellerid: sellerId
        });

        if (existingKitchen) {
          throw new Error('Kitchen with the same name already exists for this seller.');
        }

        const uniqueCategoryIds = [...new Set(categoryIds)]; // Ensure unique category IDs

        const newKitchen = new kitchenModel({
          name: lowerCaseName,
          description,
          userid: userId,
          sellerid: sellerId,
          categoryIds: uniqueCategoryIds // Include unique category IDs
        });

        const savedKitchen = await newKitchen.save();

        return {
          ...savedKitchen._doc,
          createdAt: savedKitchen.createdAt.toISOString(),
        };
      } catch (error) {
        console.error("Error adding kitchen:", error);
        throw new Error(`Error adding kitchen: ${error.message}`);
      }
    },
    updateKitchen: async (_, { id, input }, context) => {
      try {
        const { userId, sellerId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }
    
        const { name, description, categoryIds } = input;
    
        // Check if kitchen name is being updated and whether it already exists
        const lowerCaseName = name ? name.toLowerCase() : null;
        const existingKitchen = lowerCaseName ? await kitchenModel.findOne({ name: { $regex: new RegExp('^' + lowerCaseName + '$', 'i') }, sellerid: sellerId }) : null;
    
        if (existingKitchen && existingKitchen._id.toString() !== id) {
          throw new Error('Kitchen with the updated name already exists for this seller.');
        }
    
        // Prepare fields to update
        const updateFields = {};
        if (lowerCaseName) updateFields.name = lowerCaseName;
        if (description) updateFields.description = description;
        if (categoryIds) updateFields.categoryIds = categoryIds;  // Update categories
    
        // Perform the update
        const updatedKitchen = await kitchenModel.findByIdAndUpdate(
          id,
          updateFields,
          { new: true }
        );
    
        if (!updatedKitchen) {
          throw new Error("Kitchen not found");
        }
    
        return updatedKitchen;
      } catch (error) {
        console.error("Error updating kitchen:", error);
        throw new Error(`Error updating kitchen: ${error.message}`);
      }
    },
    deleteKitchen: async (_, { id }, context) => {
      try {
        const { userId, role } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }
       //console.log(role);
        if (role === 'subuser') {
          throw new Error("You do not have permission to delete categories. Please contact an admin.");
        }

        const itemCount = await billSaleModel.countDocuments();

        if (itemCount > 0) {
          throw new Error("Cannot delete kitchen as it is referenced in itemsModel");
        }

        await kitchenModel.findByIdAndDelete(id);
        return "Kitchen deleted successfully";
      } catch (error) {
        console.error("Error deleting kitchen:", error);
        throw new Error(`Error deleting kitchen: ${error.message}`);
      }
    },
    addWaiter: async (_, { addNewWaiter }, context) => {
      try {
        const { userId, sellerId } = context;
        const { name, commission, charges, address, phone, vehicleNumber, homeNumber } = addNewWaiter;

        if (!userId) {
          throw new Error("You must be logged in");
        }

        if (!name) {
          throw new Error("Name is required");
        }

        const lowerCaseName = name.toLowerCase();
        const existingWaiter = await waiterModel.findOne({ name: { $regex: new RegExp('^' + lowerCaseName + '$', 'i') }, sellerid: sellerId });

        if (existingWaiter) {
          throw new Error('Waiter with the same name already exists for this seller.');
        }

        const newWaiter = new waiterModel({
          name: lowerCaseName,
          commission,
          charges,
          address,
          phone,
          vehicleNumber,
          homeNumber,
          userid: userId,
          sellerid: sellerId,
        });

        const savedWaiter = await newWaiter.save();

        return {
          ...savedWaiter._doc,
          createdAt: savedWaiter.createdAt.toISOString(),
        };
      } catch (error) {
        console.error("Error adding waiter:", error);
        throw new Error(`Error adding waiter: ${error.message}`);
      }
    },
    updateWaiter: async (_, { id, input}, context) => {
      try {
        const { userId, sellerId } = context;
        
        if (!userId) {
          throw new Error("You must be logged in");
        }
        const { name, commission, charges, address, phone, vehicleNumber, homeNumber } = input;

        const lowerCaseName = name ? name.toLowerCase() : null;
        const existingWaiter = lowerCaseName ? await waiterModel.findOne({ name: { $regex: new RegExp('^' + lowerCaseName + '$', 'i') }, sellerid: sellerId }) : null;

        if (existingWaiter && existingWaiter._id.toString() !== id) {
          throw new Error('Waiter with the updated name already exists for this seller.');
        }

        const updateFields = {};
        if (lowerCaseName) updateFields.name = lowerCaseName;
        if (commission !== undefined) updateFields.commission = commission;
        if (charges !== undefined) updateFields.charges = charges;
        if (address !== undefined) updateFields.address = address;
        if (phone !== undefined) updateFields.phone = phone;
        if (vehicleNumber !== undefined) updateFields.vehicleNumber = vehicleNumber;
        if (homeNumber !== undefined) updateFields.homeNumber = homeNumber;

        const updatedWaiter = await waiterModel.findByIdAndUpdate(
          id,
          updateFields,
          { new: true }
        );

        if (!updatedWaiter) {
          throw new Error("Waiter not found");
        }

        return updatedWaiter;
      } catch (error) {
        console.error("Error updating waiter:", error);
        throw new Error(`Error updating waiter: ${error.message}`);
      }
    },
    deleteWaiter: async (_, { id }, context) => {
      try {
        const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }
        const itemCount = await billSaleModel.countDocuments();

        if (itemCount > 0) {
          throw new Error("Cannot delete kitchen as it is referenced in itemsModel");
        }
        await waiterModel.findByIdAndDelete(id);
        return "Waiter deleted successfully";
      } catch (error) {
        console.error("Error deleting waiter:", error);
        throw new Error(`Error deleting waiter: ${error.message}`);
      }
    },
    addTable: async (_, { addNewTable }, context) => {
      try {
        const { userId, sellerId } = context;
        const { name, tablesize, reserved, area } = addNewTable;

        if (!userId) {
          throw new Error("You must be logged in");
        }

        if (!name) {
          throw new Error("Name is required");
        }

        const lowerCaseName = name.toLowerCase();
        const existingTable = await tableModel.findOne({ name: { $regex: new RegExp('^' + lowerCaseName + '$', 'i') }, sellerid: sellerId });

        if (existingTable) {
          throw new Error('Table with the same name already exists for this seller.');
        }

        const newTable = new tableModel({
          name: lowerCaseName,
          tablesize,
          reserved,
          area,
          userid: userId,
          sellerid: sellerId,
        });

        const savedTable = await newTable.save();

        return {
          ...savedTable._doc,
          createdAt: savedTable.createdAt.toISOString(),
        };
      } catch (error) {
        console.error("Error adding table:", error);
        throw new Error(`Error adding table: ${error.message}`);
      }
    },
    updateTable: async (_, { id, input }, context) => {
      try {
        const { userId, sellerId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }
        const { name, tablesize, reserved, area } = input;
        const lowerCaseName = name ? name.toLowerCase() : null;
        const existingTable = lowerCaseName ? await tableModel.findOne({ name: { $regex: new RegExp('^' + lowerCaseName + '$', 'i') }, sellerid: sellerId }) : null;

        if (existingTable && existingTable._id.toString() !== id) {
          throw new Error('Table with the updated name already exists for this seller.');
        }

        const updateFields = {};
        if (lowerCaseName) updateFields.name = lowerCaseName;
        if (tablesize !== undefined) updateFields.tablesize = tablesize;
        if (reserved !== undefined) updateFields.reserved = reserved;
        if (area !== undefined) updateFields.area = area;

        const updatedTable = await tableModel.findByIdAndUpdate(
          id,
          updateFields,
          { new: true }
        );

        if (!updatedTable) {
          throw new Error("Table not found");
        }

        return updatedTable;
      } catch (error) {
        console.error("Error updating table:", error);
        throw new Error(`Error updating table: ${error.message}`);
      }
    },
    deleteTable: async (_, { id }, context) => {
      try {
        const { userId, role } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }
       //console.log(role);
        if (role === 'subuser') {
          throw new Error("You do not have permission to delete categories. Please contact an admin.");
        }
        const itemCount = await billSaleModel.countDocuments();

        if (itemCount > 0) {
          throw new Error("Cannot delete kitchen as it is referenced in itemsModel");
        }
        await tableModel.findByIdAndDelete(id);
        return "Table deleted successfully";
      } catch (error) {
        console.error("Error deleting table:", error);
        throw new Error(`Error deleting table: ${error.message}`);
      }
    },
    addRider: async (_, { addNewRider }, context) => {
      try {
        const { userId, sellerId } = context;
        const { name, commission, charges, address, phone, vehicleNumber, homeNumber } = addNewRider;

        if (!userId) {
          throw new Error("You must be logged in");
        }

        if (!name) {
          throw new Error("Name is required");
        }

        const lowerCaseName = name.toLowerCase();
        const existingRider = await riderModel.findOne({ name: { $regex: new RegExp('^' + lowerCaseName + '$', 'i') }, sellerid: sellerId });

        if (existingRider) {
          throw new Error('Rider with the same name already exists for this seller.');
        }

        const newRider = new riderModel({
          name: lowerCaseName,
          commission,
          charges,
          address,
          phone,
          vehicleNumber,
          homeNumber,
          userid: userId,
          sellerid: sellerId,
        });

        const savedRider = await newRider.save();

        return {
          ...savedRider._doc,
          createdAt: savedRider.createdAt.toISOString(),
        };
      } catch (error) {
        console.error("Error adding rider:", error);
        throw new Error(`Error adding rider: ${error.message}`);
      }
    },
    updateRider: async (_, { id, input }, context) => {
      try {
        const { userId, sellerId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }
        const { name, commission, charges, address, phone, vehicleNumber, homeNumber } = input;

        const lowerCaseName = name ? name.toLowerCase() : null;
        const existingRider = lowerCaseName ? await riderModel.findOne({ name: { $regex: new RegExp('^' + lowerCaseName + '$', 'i') }, sellerid: sellerId }) : null;

        if (existingRider && existingRider._id.toString() !== id) {
          throw new Error('Rider with the updated name already exists for this seller.');
        }

        const updateFields = {};
        if (lowerCaseName) updateFields.name = lowerCaseName;
        if (commission !== undefined) updateFields.commission = commission;
        if (charges !== undefined) updateFields.charges = charges;
        if (address !== undefined) updateFields.address = address;
        if (phone !== undefined) updateFields.phone = phone;
        if (vehicleNumber !== undefined) updateFields.vehicleNumber = vehicleNumber;
        if (homeNumber !== undefined) updateFields.homeNumber = homeNumber;

        const updatedRider = await riderModel.findByIdAndUpdate(
          id,
          updateFields,
          { new: true }
        );

        if (!updatedRider) {
          throw new Error("Rider not found");
        }

        return updatedRider;
      } catch (error) {
        console.error("Error updating rider:", error);
        throw new Error(`Error updating rider: ${error.message}`);
      }
    },
    deleteRider: async (_, { id }, context) => {
      try {
        const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }
        const itemCount = await billSaleModel.countDocuments();

        if (itemCount > 0) {
          throw new Error("Cannot delete kitchen as it is referenced in itemsModel");
        }
        await riderModel.findByIdAndDelete(id);
        return "Rider deleted successfully";
      } catch (error) {
        console.error("Error deleting rider:", error);
        throw new Error(`Error deleting rider: ${error.message}`);
      }
    },
    addChef: async (_, { addNewChef }, context) => {
      try {
        const { userId, sellerId } = context;
        const { name, commission, charges, address, phone, vehicleNumber, homeNumber } = addNewChef;

        if (!userId) {
          throw new Error("You must be logged in");
        }

        if (!name) {
          throw new Error("Name is required");
        }

        const lowerCaseName = name.toLowerCase();
        const existingChef = await chefModel.findOne({ name: { $regex: new RegExp('^' + lowerCaseName + '$', 'i') }, sellerid: sellerId });

        if (existingChef) {
          throw new Error('Chef with the same name already exists for this seller.');
        }

        const newChef = new chefModel({
          name: lowerCaseName,
          commission,
          charges,
          address,
          phone,
          vehicleNumber,
          homeNumber,
          userid: userId,
          sellerid: sellerId,
        });

        const savedChef = await newChef.save();

        return {
          ...savedChef._doc,
          createdAt: savedChef.createdAt.toISOString(),
        };
      } catch (error) {
        console.error("Error adding chef:", error);
        throw new Error(`Error adding chef: ${error.message}`);
      }
    },
    updateChef: async (_, { id, input }, context) => {
      try {
        const { userId, sellerId } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }
        const { name, commission, charges, address, phone, vehicleNumber, homeNumber } = input;

        const lowerCaseName = name ? name.toLowerCase() : null;
        const existingChef = lowerCaseName ? await chefModel.findOne({ name: { $regex: new RegExp('^' + lowerCaseName + '$', 'i') }, sellerid: sellerId }) : null;

        if (existingChef && existingChef._id.toString() !== id) {
          throw new Error('Chef with the updated name already exists for this seller.');
        }

        const updateFields = {};
        if (lowerCaseName) updateFields.name = lowerCaseName;
        if (commission !== undefined) updateFields.commission = commission;
        if (charges !== undefined) updateFields.charges = charges;
        if (address !== undefined) updateFields.address = address;
        if (phone !== undefined) updateFields.phone = phone;
        if (vehicleNumber !== undefined) updateFields.vehicleNumber = vehicleNumber;
        if (homeNumber !== undefined) updateFields.homeNumber = homeNumber;

        const updatedChef = await chefModel.findByIdAndUpdate(
          id,
          updateFields,
          { new: true }
        );

        if (!updatedChef) {
          throw new Error("Chef not found");
        }

        return updatedChef;
      } catch (error) {
        console.error("Error updating chef:", error);
        throw new Error(`Error updating chef: ${error.message}`);
      }
    },
    deleteChef: async (_, { id }, context) => {
      try {
        const { userId, role } = context;
        if (!userId) {
          throw new Error("You must be logged in");
        }
       //console.log(role);
        if (role === 'subuser') {
          throw new Error("You do not have permission to delete categories. Please contact an admin.");
        }
        const itemCount = await billSaleModel.countDocuments();

        if (itemCount > 0) {
          throw new Error("Cannot delete kitchen as it is referenced in itemsModel");
        }
        await chefModel.findByIdAndDelete(id);
        return "Chef deleted successfully";
      } catch (error) {
        console.error("Error deleting chef:", error);
        throw new Error(`Error deleting chef: ${error.message}`);
      }
    },
    // Function to create production item
    createProductionItem : async (_, { input }, context) => {
  try {
    const { userId, sellerId } = context;
    const { productId, rawMaterialsUsed, formulaName } = input;

    if (!userId) {
      throw new Error("You must be logged in");
    }

    if (!productId) {
      throw new Error("Product ID is required");
    }

    if (!rawMaterialsUsed || rawMaterialsUsed.length === 0) {
      throw new Error("At least one raw material is required");
    }

    // Check if a production entry with the same productId already exists for the given sellerId
    const existingProduction = await productionListModel.findOne({ productId });
    if (existingProduction) {
      throw new Error('Production with the same Product ID already exists.');
    }

    const newProduction = new productionListModel({
      productId,
      rawMaterialsUsed,
      formulaName,
      userid: userId,
      sellerid: sellerId,
    });

    // Save the new production
    const savedProduction = await newProduction.save();

    // Populate the fields after saving
    const populatedProduction = await productionListModel
      .findById(savedProduction._id)
      .populate('productId', '_id productname')
      .populate({
        path: 'rawMaterialsUsed.rawId',
        select: '_id productname',
      });

    return {
      ...populatedProduction._doc,
      createdAt: populatedProduction.createdAt.toISOString(),
    };
  } catch (error) {
    console.error("Error adding production:", error);
    throw new Error(`Error adding production: ${error.message}`);
  }
    },
    deleteproductionList: async (_, args, context) => {
      const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
     //console.log(role);
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }
      // Count the number of items associated with the unit ID
      const itemCount = await billSaleModel.countDocuments();

      if (itemCount > 0) {
        throw new Error("Cannot delete items as it is referenced in Sale");
      }
      await productionListModel.findByIdAndDelete(args.id);
      return "Items Delte successfully"
    },
    createProductionDo: async (_, { input }, context) => {
      try {
        const { userId, sellerId } = context;
        const { prodcart, whareid, formulaName } = input;
    
        if (!userId) {
          throw new Error("You must be logged in");
        }
    
        // Create new production entry
        const newProduction = new productionModel({
          prodcart,
          whareid,
          formulaName,
          userid: userId,
          sellerid: sellerId,
        });
    
        // Save the new production entry
        const savedProduction = await newProduction.save();
    
        // Populate productId within each prodCart
        const populatedProduction = await productionModel
          .findById(savedProduction._id)
          .populate({
            path: 'prodcart.productId',
            select: '_id productname',
          })
          .exec();
    
        // Loop through each prodcart item
        for (const item of prodcart) {
          const { productId, qty } = item;
    
          // Find or create stock entry for the product
          let stock = await stockModel.findOne({ productId, warehouseId: whareid });
    
          if (!stock) {
            stock = new stockModel({ productId, warehouseId: whareid, quantity: qty, sellerid: sellerId });
          } else {
            stock.quantity += qty;
          }
    
          // Save stock changes
          await stock.save();
    
          // Fetch product data to calculate total cost
          const productData = await productionListModel
            .findOne({ productId })
            .populate('productId', '_id productname')
            .populate({
              path: 'rawMaterialsUsed.rawId',
              select: '_id productname cost',
            });
    
          if (!productData) {
            throw new Error(`Product with ID ${productId} not found`);
          }
    
          // Calculate total cost
          let totalCost = 0;
          for (const material of productData.rawMaterialsUsed) {
            totalCost += material.rawId.cost * material.qtyUsed;
          }
          totalCost = parseFloat(totalCost.toFixed(2)); // Ensure totalCost is a number with two decimal places
    
          // Update cost in itemsModel (do not increment)
          await itemsModel.findByIdAndUpdate(productId, { cost: totalCost });
    
          // Loop through raw materials and update stock
          for (const material of productData.rawMaterialsUsed) {
            const { rawId, qtyUsed } = material;
    
            // Find stock entry for each raw material
            let rawMaterialStock = await stockModel.findOne({ productId: rawId, warehouseId: whareid });
    
            if (!rawMaterialStock) {
              // If no stock entry exists, create a new one
              rawMaterialStock = new stockModel({ productId: rawId, warehouseId: whareid, quantity: -qtyUsed * qty, sellerid: sellerId });
            } else {
              // If stock entry exists, update the quantity
              rawMaterialStock.quantity -= qtyUsed * qty;
            }
    
            // Save stock changes
            await rawMaterialStock.save();
          }
        }
    
        return {
          ...populatedProduction._doc,
          createdAt: savedProduction.createdAt.toISOString(),
        };
      } catch (error) {
        console.error("Error adding production:", error);
        throw new Error(`Error adding production: ${error.message}`);
      }
    },    
    deleteproductionDo: async (_, args, context) => {
      const { userId, role } = context;
      if (!userId) {
        throw new Error("You must be logged in");
      }
      if (role === 'subuser') {
        throw new Error("You do not have permission to delete categories. Please contact an admin.");
      }
    
      // Find the production entry to delete
      const productionToDelete = await productionModel.findById(args.id).populate({
        path: 'prodcart.productId',
        select: '_id productname'
      });
    
      if (!productionToDelete) {
        throw new Error("Production entry not found");
      }
    
      // Loop through each prodcart item to update stock quantities
      for (const item of productionToDelete.prodcart) {
        const { productId, qty } = item;
        let stock = await stockModel.findOne({ productId, warehouseId: productionToDelete.whareid });
    
        if (stock) {
          // Decrease the quantity of the finished product
          stock.quantity -= qty;
    
          // Save stock changes
          await stock.save();
    
          // Fetch product data to update raw materials stock
          const productData = await productionListModel
            .findOne({ productId })
            .populate('productId', '_id productname')
            .populate({
              path: 'rawMaterialsUsed.rawId',
              select: '_id productname cost',
            });
    
          if (productData) {
            // Loop through stock and update quantity for raw materials
            for (const material of productData.rawMaterialsUsed) {
              const { rawId, qtyUsed } = material;
    
              // Find stock entry for each raw material
              let rawMaterialStock = await stockModel.findOne({ productId: rawId, warehouseId: productionToDelete.whareid });
    
              if (rawMaterialStock) {
                // Increase the quantity of raw materials
                rawMaterialStock.quantity += qtyUsed;
    
                // Save stock changes
                await rawMaterialStock.save();
              }
            }
          }
        }
      }
    
      // Delete the production entry
      await productionModel.findByIdAndDelete(args.id);
    
      return "Production entry deleted successfully";
    },
    updateItemFields: async () => {
      try {
        const result = await itemsModel.updateMany(
          {
            $or: [
              { cost: { $type: "string" } },
              { avgcost: { $type: "string" } },
              { price: { $type: "string" } },
              { wsprice: { $type: "string" } },
              { discount: { $type: "string" } },
              { alertqty: { $type: "string" } },
              { tax: { $type: "string" } }
            ]
          },
          [
            {
              $set: {
                cost: { $toInt: "$cost" },
                avgcost: { $toInt: "$avgcost" },
                price: { $toInt: "$price" },
                wsprice: { $toInt: "$wsprice" },
                discount: { $toInt: "$discount" },
                alertqty: { $toInt: "$alertqty" },
                tax: { $toInt: "$tax" }
              }
            }
          ]
        );

        if (result.modifiedCount > 0) {
          return 'Fields successfully updated.';
        } else {
          return 'No fields updated.';
        }
      } catch (error) {
        console.error(error);
        return 'An error occurred while updating fields.';
      }
    },
    
  },

};

export default resolvers;
