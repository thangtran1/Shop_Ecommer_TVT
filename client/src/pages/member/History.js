import React, { useEffect, useState } from "react";
import { Input, Pagination } from "antd";
import { apiGetUserOrders } from "apis/product";
const History = () => {
  // const [orders, setOrders] = useState([]);
  const [totalCounts, setTotalCounts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchOrders = async () => {
    const response = await apiGetUserOrders({
      page: currentPage,
      limit: 5,
    });
    if (response.success) {
      // setOrders(response.orders);
      setTotalCounts(response.counts);
    } else {
      // setOrders([]);
      setTotalCounts(0);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  return (
    <div className="w-full">
      <h1 className="h-[75px] flex items-center justify-between text-3xl font-bold px-4 border-b">
        <span className="text-[25px] font-bold">History</span>
      </h1>
      <div className="w-full p-4">
        <div className="flex justify-end py-4">
          <Input
            placeholder="Search by title, brand, etc..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: 300, marginRight: 8 }}
            className="search-input"
          />
        </div>

        <Pagination
          current={currentPage}
          pageSize={5}
          total={totalCounts}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: 16, textAlign: "right" }}
        />
      </div>
    </div>
  );
};

export default History;
