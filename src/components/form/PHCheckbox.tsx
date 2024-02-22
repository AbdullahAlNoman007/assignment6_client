import { Form, Checkbox } from 'antd';
import { Controller } from 'react-hook-form';

type TCheckboxProps = {
    name: string;
    label?: string;
};

const PHCheckbox = ({ name, label }: TCheckboxProps) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <Controller
                name={name}
                render={({ field }) => (
                    <Form.Item valuePropName="checked">
                        <Checkbox {...field}>{label}</Checkbox>
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default PHCheckbox;
