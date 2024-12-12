import React, { memo, useState } from "react";
import { tabs } from "../ultils/constants";

const DetailInformation = () => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div>
      <div className="flex items-center gap-2 relative bottom-[-1px]">
        {tabs.map((el) => (
          <span
            onClick={() => setActiveTab(el.id)}
            className={`p-2 px-4 text-sm font-medium cursor-pointer
              transition-all duration-200 hover:bg-gray-200
              ${
                el.id === activeTab
                  ? "text-black bg-white border border-gray-300 font-medium"
                  : "bg-gray-100 hover:text-gray-800"
              }`}
            key={el.id}
          >
            {el.value}
          </span>
        ))}
      </div>
      <div className="w-full  border p-4">
        <div
          key={activeTab}
          className="animate-fade-in transition-all duration-300 ease-in-out"
          dangerouslySetInnerHTML={{
            __html: tabs.find((el) => el.id === activeTab)?.content,
          }}
        />
      </div>
    </div>
  );
};

export default memo(DetailInformation);
