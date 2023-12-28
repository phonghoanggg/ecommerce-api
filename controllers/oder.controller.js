import Order from "../models/oder.model.js";

// Create a new order for a specific user
export const createOrderForUser = async (req, res) => {
  try {
    const { name, address, phone, cartItems, total, userId, status } = req.body;
    const order = new Order({
      userId,
      name,
      address,
      phone,
      cartItems,
      total,
      status,
    });
    await order.save();
    res.status(201).json({ message: "success", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllOders = async (req, res) => {
  try {
    // Retrieve all orders from the database
    const orders = await Order.find();

    // Send the list of orders as the response
    res.status(200).json(orders);
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
