import path from "./path";
import icons from "./icons";
const { FaShieldAlt, FaTruck, CiGift, FaReplyAll, FaTty } = icons;
export const navigation = [
  {
    id: 1,
    value: "HOME",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: "PRODUCTS",
    path: `/${path.PRODUCTS}`,
  },
  {
    id: 3,
    value: "BLOGS",
    path: `/${path.BLOGS}`,
  },
  {
    id: 4,
    value: "OUR SERVICES",
    path: `/${path.OUR_SERVICES}`,
  },

  {
    id: 5,
    value: "FAQs",
    path: `/${path.FAQ}`,
  },
];

export const productItemPerPage = [
  {
    id: 1,
    title: "guarantee",
    sub: "Quality checked",
    icon: <FaShieldAlt />,
  },
  {
    id: 2,
    title: "Free Shipping",
    sub: "Free on all products",
    icon: <FaTruck />,
  },
  {
    id: 3,
    title: "Special gift cards",
    sub: "Special gift cards",
    icon: <CiGift />,
  },
  {
    id: 4,
    title: "Free return",
    sub: "Within 7 days",
    icon: <FaReplyAll />,
  },
  {
    id: 5,
    title: "Consultancy",
    sub: "Lifetime 24/7/356",
    icon: <FaTty />,
  },
];

export const tabs = [
  {
    id: 1,
    value: "DESCRIPTION",
    content: `<div class="space-y-2">
      <div class="grid grid-cols-2 gap-4">
        <p><span class="font-medium">Technology:</span> GSM / HSPA / LTE</p>
        <p><span class="font-medium">Dimensions:</span> 153.8 x 75.5 x 7.6 mm</p>
        <p><span class="font-medium">Weight:</span> 154 g</p>
        <p><span class="font-medium">Display:</span> IPS LCD 5.5 inches</p>
        <p><span class="font-medium">Resolution:</span> 720 x 1280</p>
        <p><span class="font-medium">OS:</span> Android OS, v6.0 (Marshmallow)</p>
        <p><span class="font-medium">Chipset:</span> Octa-core</p>
        <p><span class="font-medium">CPU:</span> Octa-core</p>
        <p><span class="font-medium">Internal:</span> 32 GB, 4 GB RAM</p>
        <p><span class="font-medium">Camera:</span> 13MB - 20 MP</p>
      </div>
    </div>`,
  },
  {
    id: 2,
    value: "WARRANTY",
    content: `<div class="space-y-4">
      <h3 class="text-xl font-semibold">Warranty Information</h3>
      <div class="space-y-2">
        <h4 class="font-medium">LIMITED WARRANTIES</h4>
        <p class="text-gray-600">Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:</p>
      </div>
      <div class="space-y-2">
        <h4 class="font-medium">Frames Used In Upholstered and Leather Products</h4>
        <p class="font-medium">Limited Lifetime Warranty</p>
        <p class="text-gray-600">A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.</p>
      </div>
    </div>`,
  },
  {
    id: 3,
    value: "DELIVERY",
    content: `<div class="space-y-6">
      <div class="space-y-2">
        <h3 class="text-xl font-semibold">Purchasing & Delivery</h3>
        <p class="text-gray-600">Before you make your purchase, it's helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.</p>
      </div>

      <div class="space-y-2">
        <h4 class="text-lg font-medium">Picking up at the store</h4>
        <p class="text-gray-600">Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser's responsibility to make sure the correct items are picked up and in good condition.</p>
      </div>

      <div class="space-y-2">
        <h4 class="text-lg font-medium">Delivery</h4>
        <div class="space-y-4 text-gray-600">
          <p>Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.</p>
          
          <p>In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team.</p>
          
          <p>Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home.</p>
          
          <p>Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.</p>
        </div>
      </div>
    </div>`,
  },
  {
    id: 4,
    value: "PAYMENT",
    content: `<div class="space-y-6">
      <div class="space-y-2">
        <h3 class="text-xl font-semibold">Payment Methods</h3>
        <div class="space-y-4 text-gray-600">
          <p>Before you make your purchase, it's helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.</p>
        </div>
      </div>

      <div class="space-y-2">
        <h4 class="text-lg font-medium">Store Pickup Policy</h4>
        <div class="space-y-4 text-gray-600">
          <p>Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs.</p>
          
          <p>Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser's responsibility to make sure the correct items are picked up and in good condition.</p>
        </div>
      </div>

      <div class="space-y-2">
        <h4 class="text-lg font-medium">Delivery Terms</h4>
        <div class="space-y-4 text-gray-600">
          <p>Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.</p>
          
          <p>In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team.</p>
          
          <p>Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home.</p>
          
          <p>Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.</p>
        </div>
      </div>
    </div>`,
  },
];
export const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "pink",
  "black",
];
export const sizes = ["S", "M", "L", "XL", "XXL"];
export const brands = [
  "Apple",
  "Samsung",
  "Sony",
  "LG",
  "Panasonic",
  "Toshiba",
  "Philips",
];
export const categories = [
  "Electronics",
  "Clothing",
  "Home Decor",
  "Sports",
  "Toys",
  "Books",
  "Furniture",
];
export const price = [
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "1000",
];
export const sortOptions = [
  { id: 1, text: "Best Selling", value: "-sold" },
  { id: 2, text: "Alphabetically, A-Z", value: "-title" },
  { id: 3, text: "Alphabetically, Z-A", value: "title" },
  { id: 4, text: "Price, height to low", value: "-price" },
  { id: 5, text: "Price, low to height", value: "price" },
  { id: 6, text: "Date, new to old", value: "-createdAt" },
  { id: 7, text: "Date, old to new", value: "createdAt" },
];
export const voteOptions = [
  { id: 1, text: "Bad", value: "bad" },
  { id: 2, text: "Good", value: "good" },
  { id: 3, text: "Very Good", value: "very good" },
  { id: 4, text: "Excellent", value: "excellent" },
  { id: 5, text: "Perfect", value: "perfect" },
];
