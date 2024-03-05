import {useState} from "react";

import { useGetIdentity } from "@refinedev/core";

import { SettingOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";

import type { User } from "@/graphql/schema.types";

import CustomAvatar  from "../custom-avatar";
import { Text } from "../text";
import { AccountSettings } from "./account-settings";

const CurrentUser = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { data: user } = useGetIdentity<User>()

  const content = (
    <div style={{
      display: 'flex', 
      flexDirection: 'column'
      }}>
        <Text
          strong
          style={{ padding: '12px 20px' }}
        >
          {user?.name}
        </Text>

        <div style={{
          border: '1px solid #d9d9d9',
          padding: '4px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <Button
            style={{textAlign: 'left'}}
            icon={<SettingOutlined/>}
            type='text'
            block
            onClick={()=> setIsOpen(true)}
          >
            Account Settings
          </Button>
        </div>
    </div>

  )

  return (
    <>
       <Popover
        placement="bottomRight"
        content={content}
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
      >
        <CustomAvatar
          name={user?.name}
          src={user?.avatarUrl}
          size="default"
          style={{ cursor: "pointer" }}
        />
      </Popover>

      {user &&(
         <AccountSettings
          opened={isOpen}
          setOpened={setIsOpen}
          userId={user?.id}
         />
      )}
    </>
  )
}

export default CurrentUser
