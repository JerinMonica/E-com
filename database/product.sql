-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2025 at 03:50 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `product`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cartid` int(11) NOT NULL,
  `productid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cartid`, `productid`) VALUES
(4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `orderdate` datetime DEFAULT current_timestamp(),
  `deliverystatus` varchar(50) DEFAULT 'Pending',
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_status` varchar(50) DEFAULT 'Pending',
  `country` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderid`, `userid`, `name`, `email`, `address`, `city`, `state`, `orderdate`, `deliverystatus`, `payment_method`, `payment_status`, `country`, `phone`) VALUES
(1, 1, 'Jerin Monica', 'jerinmonica22@gmail.com', 'vizhunthayambalam', NULL, NULL, '2025-07-01 17:33:02', 'Pending', NULL, 'Pending', NULL, NULL),
(2, 1, 'Jerin Monica', 'jerinmonica22@gmail.com', 'Karungal', NULL, NULL, '2025-07-01 17:36:32', 'Pending', NULL, 'Pending', NULL, NULL),
(3, 1, 'Jerin Monica', 'jerinmonica22@gmail.com', 'karungal', 'Nagercoil', NULL, '2025-07-02 06:41:58', 'Pending', 'COD', 'Pending', 'India', '8925239763');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `itemid` int(11) NOT NULL,
  `orderid` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `productname` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`itemid`, `orderid`, `productid`, `productname`, `quantity`, `price`) VALUES
(1, 1, 2, 'Teddy Bear', 3, 949),
(2, 2, 1, 'boAt Airdopes 161  ', 1, 949),
(3, 3, 1, 'boAt Airdopes 161  ', 1, 949);

-- --------------------------------------------------------

--
-- Table structure for table `productpage`
--

CREATE TABLE `productpage` (
  `productid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productpage`
--

INSERT INTO `productpage` (`productid`, `name`, `price`, `stock`, `image`, `description`, `category`) VALUES
(1, 'boAt Airdopes 161  ', 949, 1, 'buds.jpg', 'Wireless Earbuds with Massive Playback of upto 40 Hours, IPX5 Water & Sweat Resistance, IWP Technology, Type C Interface  ', 'Electronics'),
(2, 'Teddy Bear', 949, 3, 'teddy.jpg', 'HUG \'n\' FEEL SOFT TOYS 3Feet Red Giant Teddy Bear Soft, Plush, And Cuddly Stuffed Animal For Kids, Birthdays, Anniversaries, Valentine\'S Day, And Special Occasions Large Huggable', 'Toy'),
(3, 'Mobile', 150000, 3, 'mobile.avif', 'Galaxy S25 Series: Samsung to offer Galaxy S25 Ultra with 16GB RAM in India', 'Electronics'),
(4, '  Refrigerator', 24400, 1, 'fridge.webp', '236 L Convertible Freezer Double Door Refrigerator RT28C3733B1', 'Electronics'),
(5, 'Laptop', 120000, 2, 'laptop.jpg', 'Hp Elitebook 840G4 A++ Grade Business Class Light Weight', 'Electronics'),
(6, 'In the Jungle', 413, 2, 'jungle.jpg', 'In the Jungle - Lift the Flap Book for Kids Age 3-6 Years with Bright and Colourful Pictures', 'Books');

-- --------------------------------------------------------

--
-- Table structure for table `userdetails`
--

CREATE TABLE `userdetails` (
  `userid` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `emailid` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(200) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userdetails`
--

INSERT INTO `userdetails` (`userid`, `username`, `emailid`, `password`, `role`) VALUES
(1, 'Jerin Monica', 'jerinmonica22@gmail.com', '$2b$12$uqvdZvPXEF9jS93Wt3Y3Net304dV7rmmyki3KtKOsXWYzK6NxEfL.', 'user'),
(3, 'Jerin Monica', 'monijeri2004@gmail.com', '$2b$12$dhNmXsU9dhREDehoiOo6ner/YwvtOx.9JZO/SHYdKW/UUt/FAiufq', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cartid`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderid`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`itemid`),
  ADD KEY `fk_order` (`orderid`);

--
-- Indexes for table `productpage`
--
ALTER TABLE `productpage`
  ADD PRIMARY KEY (`productid`);

--
-- Indexes for table `userdetails`
--
ALTER TABLE `userdetails`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cartid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `itemid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `productpage`
--
ALTER TABLE `productpage`
  MODIFY `productid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `userdetails`
--
ALTER TABLE `userdetails`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_order` FOREIGN KEY (`orderid`) REFERENCES `orders` (`orderid`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
