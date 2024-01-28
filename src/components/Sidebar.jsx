// import React from "react";
import { Stack } from "@mui/material";

import { categories } from "../utils/constants.js";


const Sidebar = ({ selectedCategory, setSelectedCategory }) => (
    <Stack
        direction="row"
        className="scroll-horizontal"  // Add this class to enable scrollbar on hover
        sx={{
            overflowY: "auto",
            height: { sx: "auto", md: "95%" },
            flexDirection: { md: "column" },
        }}
    >
        {categories.map((category) => (
            <button
                className="category-btn"
                onClick={() => setSelectedCategory(category.name)}
                style={{
                    background: category.name === selectedCategory && '#272727', color: 'white'
                }}
                key={category.name}
            >
                <span style={{ color: 'white', marginRight: '15px' }}>
                    {category.icon}
                </span>
                <span style={{ opacity: category.name === selectedCategory ? '1' : '0.8' }}>
                    {category.name}
                </span>
            </button>
        ))}
    </Stack>
)


export default Sidebar;