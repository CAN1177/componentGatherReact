import { ComponentStory, ComponentMeta } from "@storybook/react";

import Menu from "../components/Menu/menu";
import MenuItem from "../components/Menu/menuItem";

import SubMenu from "../components/Menu/subMenu"

const Template: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args} onSelect={(index) =>{
		console.log('%c 🥡 index: ', 'font-size:20px;background-color: #FCA650;color:#fff;', index);
	}}  defaultOpenSubMenus ={["1"]} mode = "horizontal">
		<MenuItem>Item 1</MenuItem>
		<SubMenu title="Item 2">
			<MenuItem >Child 1</MenuItem>
			<MenuItem >Child 2</MenuItem>
			<MenuItem >Child 3</MenuItem>
		</SubMenu>
	</Menu>
);

export default {
  title: "Example/Menu",
  component: Menu,
} as ComponentMeta<typeof Menu>;

export const Default = Template.bind({});

Default.args = {
	defaultIndex: "0",
  mode: "horizontal",
};
