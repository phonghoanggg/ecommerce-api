import { format } from "date-fns";
import Order from "../models/oder.model.js";

// Create a new order for a specific user
export const createOrderForUser = async (req, res) => {
  try {
    const {
      name,
      address,
      province,
      district,
      commune,
      phone,
      cartItems,
      total,
      userId,
    } = req.body;
    const order = new Order({
      userId,
      name,
      address,
      province,
      district,
      commune,
      phone,
      cartItems,
      total,
      status: "Pending",
    });
    await order.save();
    res.status(201).json({ message: "success", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("cartItems.productId");
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const filterOrderByStatus = async (req, res) => {
  try {
    const status = req.query.status;
    const query = {};
    if (status != "All") {
      query.status = status;
    }
    // // Retrieve all orders from the database
    const orders = await Order.find(query).sort({ createdAt: -1 });

    // Send the list of orders as the response
    res.status(200).json({ data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateStatusorder = async (req, res) => {
  try {
    const { id, status } = req.body; // Ensure id is included in the request body
    const updatedOrder = await Order.findByIdAndUpdate(
      id, // Only id is needed
      { $set: { status } },
      { new: true }
    );

    // Send the updated order as the response
    res.status(200).json({
      status: "Update order status successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getRevenueStatistics = async (req, res) => {
  try {
    const orders = await Order.find();

    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

    res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSoldProductsStatistics = async (req, res) => {
  try {
    const completedOrders = await Order.find({ status: "Success" });

    // Tính tổng số lượng sản phẩm đã bán từ tất cả các đơn hàng đã hoàn tất
    const totalSoldProducts = completedOrders.reduce((acc, order) => {
      return (
        acc +
        order.cartItems.reduce(
          (itemAcc, cartItem) => itemAcc + cartItem.quantity,
          0
        )
      );
    }, 0);

    // Gửi tổng số lượng sản phẩm đã bán như là phản hồi
    res.status(200).json({ totalSoldProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSoldProductsByMonthAndYear = async (req, res) => {
  try {
    const completedOrders = await Order.find({ status: "Success" }).sort({
      createdAt: -1,
    });

    const monthlyStatistics = [];

    completedOrders.forEach((order) => {
      const monthYearKey = format(new Date(order.createdAt), "yyyy-MM");

      let exits = monthlyStatistics.find((item) => item.month === monthYearKey);

      if (!exits) {
        exits = {
          month: monthYearKey,
          total: 0,
        };
        monthlyStatistics.push(exits);
      }

      const orderQuantity = order.cartItems.reduce(
        (itemAcc, cartItem) => itemAcc + cartItem.quantity,
        0
      );

      exits.total += orderQuantity;
    });

    res.status(200).json(monthlyStatistics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSoldProductsStatisticsById = async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $match: { status: "Success" } },
      { $unwind: "$cartItems" },
      {
        $group: {
          _id: "$cartItems._id",
          totalQuantitySold: { $sum: "$cartItems.quantity" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productInfo",
        },
      },
    ]);

    res.status(200).json({ productSales: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrderDetail = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Tìm đơn hàng dựa trên ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    // Nếu tìm thấy, trả về thông tin đơn hàng
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Kiểm tra xem đơn hàng có tồn tại không
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại." });
    }

    // Thực hiện xóa đơn hàng
    await Order.findByIdAndDelete(orderId);

    res.status(204).json({ message: "Đơn hàng đã được xóa thành công." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi trong quá trình xóa đơn hàng." });
  }
};
