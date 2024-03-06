import { useForm, useSelect } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";
import {
  GetFields,
  GetFieldsFromList,
  GetVariables,
} from "@refinedev/nestjs-query";

import { FlagOutlined } from "@ant-design/icons";
import { Checkbox, Form, Select, Space } from "antd";

import AccordionHeaderSkeleton  from "@/components";
import {
  TaskStagesSelectQuery,
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
} from "@/graphql/types";

import { UPDATE_TASK_MUTATION } from "@/graphql/mutations";
import { TASK_STAGES_SELECT_QUERY } from "@/graphql/queries";

type Props = {
  isLoading?: boolean;
};

export const StageForm = ({ isLoading }: Props) => {
  // use the useForm hook to manage the form for adding a stage to a task
  const { formProps } = useForm<
    GetFields<UpdateTaskMutation>,
    HttpError,

    Pick<GetVariables<UpdateTaskMutationVariables>, "stageId" | "completed">
  >({
    queryOptions: {
      // disable the query to prevent fetching data on component mount
      enabled: false,
    },

    
    autoSave: {
      enabled: true,
      debounce: 0,
    },
    // specify the mutation that should be performed
    meta: {
      gqlMutation: UPDATE_TASK_MUTATION,
    },
  });

  
  // https://refine.dev/docs/ui-integrations/ant-design/hooks/use-select/
  const { selectProps } = useSelect<GetFieldsFromList<TaskStagesSelectQuery>>({
    
    resource: "taskStages",
    
    filters: [
      {
        field: "title",
        operator: "in",
        value: ["TODO", "IN PROGRESS", "IN REVIEW", "DONE"],
      },
    ],
    sorters: [
      {
        field: "createdAt",
        order: "asc",
      },
    ],
    
    meta: {
      gqlQuery: TASK_STAGES_SELECT_QUERY,
    },
  });

  if (isLoading) return <AccordionHeaderSkeleton />;

  return (
    <div style={{ padding: "12px 24px", borderBottom: "1px solid #d9d9d9" }}>
      <Form
        layout="inline"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
        {...formProps}
      >
        <Space size={5}>
          <FlagOutlined />
          <Form.Item
            noStyle
            name={["stageId"]}
            initialValue={formProps?.initialValues?.stage?.id}
          >
            <Select
              {...selectProps}
              
              popupMatchSelectWidth={false}
              // concat the options with an option for unassigned stage
              options={selectProps.options?.concat([
                {
                  label: "Unassigned",
                  value: null,
                },
              ])}
              bordered={false}
              showSearch={false}
              placeholder="Select a stage"
              onSearch={undefined}
              size="small"
            />
          </Form.Item>
        </Space>
        <Form.Item noStyle name="completed" valuePropName="checked">
          <Checkbox>Mark as complete</Checkbox>
        </Form.Item>
      </Form>
    </div>
  );
};
