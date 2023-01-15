import { AddIcon, CloseIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from "@chakra-ui/icons";
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useProvideAuth } from "hooks/useAuth";
import React from "react";

interface MenuProps {}

const ProfileMenu: React.FC<MenuProps> = () => {
	const { signout } = useProvideAuth();
	return (
		<Menu>
			<MenuButton as={IconButton} aria-label='Options' icon={<HamburgerIcon />} variant='outline' />
			<MenuList m={0}>
				<MenuItem onClick={signout}>Logout</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default ProfileMenu;
