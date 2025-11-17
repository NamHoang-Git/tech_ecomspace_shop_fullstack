import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGlobalContext } from '../provider/GlobalProvider';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { MdDelete, MdEdit, MdRestore } from 'react-icons/md';
import AddAddress from '../components/AddAddress';
import EditAddressDetails from '../components/EditAddressDetails';
import ConfirmBox from '../components/ConfirmBox';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import GlareHover from '@/components/GlareHover';
import { Button } from '@/components/ui/button';
import { IoMdTrash } from 'react-icons/io';

const Address = () => {
    const addressList = useSelector((state) => state.addresses.addressList);
    const [openAddress, setOpenAddress] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({});
    const { fetchAddress } = useGlobalContext();
    const [confirmAction, setConfirmAction] = useState({
        isOpen: false,
        type: '', // 'delete' or 'restore'
        addressId: null,
        message: '',
        onConfirm: null,
    });

    // Sắp xếp địa chỉ hiện hoạt (status: true) với isDefault: true lên đầu
    const activeAddresses = addressList
        .filter((address) => address.status === true)
        .sort((a, b) => {
            if (a.isDefault && !b.isDefault) return -1;
            if (!a.isDefault && b.isDefault) return 1;
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

    // Lấy danh sách địa chỉ đã ẩn (status: false)
    const deletedAddresses = addressList.filter(
        (address) => address.status === false
    );

    const handleDisableAddress = async (id) => {
        try {
            const response = await Axios({
                ...SummaryApi.delete_address,
                data: {
                    _id: id,
                },
            });
            if (response.data.success) {
                toast.success('Address Removed');
                if (fetchAddress) {
                    fetchAddress();
                }
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    const handleRestoreAddress = async (id) => {
        try {
            const response = await Axios({
                ...SummaryApi.restore_address,
                data: {
                    _id: id,
                },
            });
            if (response.data.success) {
                toast.success('Đã khôi phục địa chỉ');
                if (fetchAddress) {
                    fetchAddress();
                }
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    const handlePermanentDelete = async (id) => {
        try {
            const response = await Axios({
                ...SummaryApi.permanent_delete_address,
                data: {
                    _id: id,
                },
            });
            if (response.data.success) {
                toast.success('Đã xóa vĩnh viễn địa chỉ');
                if (fetchAddress) {
                    fetchAddress();
                }
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className="container mx-auto grid gap-2 z-10">
            <Card className="text-white py-6 flex-row justify-between gap-6 border-gray-600 border-2">
                <CardHeader>
                    <CardTitle className="text-lg text-lime-300 font-bold uppercase">
                        Danh mục
                    </CardTitle>
                    <CardDescription className="text-white">
                        Quản lý thông tin danh mục
                    </CardDescription>
                </CardHeader>

                <CardFooter>
                    <GlareHover
                        background="transparent"
                        glareOpacity={0.3}
                        glareAngle={-30}
                        glareSize={300}
                        transitionDuration={800}
                        playOnce={false}
                    >
                        <Button
                            onClick={() => setOpenAddress(true)}
                            className="bg-transparent text-white hover:bg-transparent"
                        >
                            Thêm Mới
                        </Button>
                    </GlareHover>
                </CardFooter>
            </Card>

            {/* Danh sách địa chỉ hiện hoạt */}
            <div className="p-2 grid gap-4 overflow-auto max-h-[calc(100vh/1.5)]">
                {activeAddresses.length === 0 ? (
                    <p className="text-gray-500">
                        Chưa có địa chỉ. Hãy thêm địa chỉ mới
                    </p>
                ) : (
                    activeAddresses.map((address, index) => (
                        <div
                            key={index}
                            className="border border-secondary-100 rounded-md px-2 sm:px-4 py-3 hover:bg-base-100
                        shadow-md cursor-pointer liquid-glass"
                        >
                            <div className="flex justify-between sm:items-start items-end gap-4">
                                <div className="flex items-baseline gap-2 sm:gap-3">
                                    <div className="flex flex-col gap-1 text-[10px] sm:text-base text-justify">
                                        <p>Địa chỉ: {address?.address_line}</p>
                                        <p>Thành phố: {address?.city}</p>
                                        <p>Quận / Huyện: {address?.district}</p>
                                        <p>Phường / Xã: {address?.ward}</p>
                                        <p>Quốc gia: {address?.country}</p>
                                        <p>Số điện thoại: {address?.mobile}</p>
                                    </div>
                                    {address.isDefault && (
                                        <span className="text-rose-500 text-[10px] sm:text-lg font-bold">
                                            (*)
                                        </span>
                                    )}
                                </div>
                                {/* PC / Tablet */}
                                <div className="sm:flex hidden items-center gap-2">
                                    <button
                                        onClick={() => {
                                            setOpenEdit(true);
                                            setEditData(address);
                                        }}
                                        className="shadow-md shadow-secondary-100 rounded hover:opacity-80 p-2 text-white liquid-glass"
                                    >
                                        <MdEdit size={20} />
                                    </button>
                                    {!address.isDefault && (
                                        <>
                                            <div className="w-[2px] h-4 bg-secondary-100"></div>
                                            <button
                                                onClick={() => {
                                                    setConfirmAction({
                                                        isOpen: true,
                                                        type: 'delete',
                                                        addressId: address._id,
                                                        message:
                                                            'Bạn có chắc chắn muốn xóa địa chỉ này?',
                                                        onConfirm:
                                                            handleDisableAddress,
                                                    });
                                                }}
                                                className="shadow-md shadow-secondary-100 rounded hover:opacity-80 p-2 text-rose-400 liquid-glass"
                                            >
                                                <MdDelete size={20} />
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Mobile */}
                                <div className="flex sm:hidden items-center gap-2">
                                    <button
                                        onClick={() => {
                                            setOpenEdit(true);
                                            setEditData(address);
                                        }}
                                        className="shadow-md shadow-secondary-100 rounded hover:opacity-80 p-[2px] text-white liquid-glass"
                                    >
                                        <MdEdit size={15} />
                                    </button>
                                    <div className="w-[2px] h-4 bg-secondary-100"></div>
                                    <button
                                        onClick={() => {
                                            setConfirmAction({
                                                isOpen: true,
                                                type: 'delete',
                                                addressId: address._id,
                                                message:
                                                    'Bạn có chắc chắn muốn xóa địa chỉ này?',
                                                onConfirm: handleDisableAddress,
                                            });
                                        }}
                                        className="shadow-md shadow-secondary-100 rounded hover:opacity-80 p-[2px] text-rose-400 liquid-glass"
                                    >
                                        <MdDelete size={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Danh sách địa chỉ đã xóa */}
            {deletedAddresses.length > 0 && (
                <Card className="p-2 grid gap-4 mt-4">
                    <CardHeader className="p-0">
                        <CardTitle className="text-sm text-rose-500 font-bold uppercase flex gap-2 pt-4">
                            <IoMdTrash size={18} />
                            Địa chỉ đã xóa
                        </CardTitle>
                    </CardHeader>
                    {deletedAddresses.map((address, index) => (
                        <div
                            key={index}
                            className="border border-secondary-100 rounded-md px-2 sm:px-4 py-3 hover:bg-base-100
                        shadow-md cursor-pointer opacity-60 flex justify-between liquid-glass"
                        >
                            <div className="flex items-baseline gap-2 sm:gap-3">
                                <div className="flex flex-col gap-1 text-[10px] sm:text-base text-justify">
                                    <p>Địa chỉ: {address.address_line}</p>
                                    <p>Thành phố: {address.city}</p>
                                    <p>Quận / Huyện: {address.district}</p>
                                    <p>Phường / Xã: {address.ward}</p>
                                    <p>Quốc gia: {address.country}</p>
                                    <p>Số điện thoại: {address.mobile}</p>
                                </div>
                                {address.isDefault && (
                                    <span className="text-secondary-200 text-[10px] sm:text-lg font-bold">
                                        (*)
                                    </span>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <button
                                    onClick={() => {
                                        setConfirmAction({
                                            isOpen: true,
                                            type: 'restore',
                                            addressId: address._id,
                                            message:
                                                'Bạn có chắc chắn muốn khôi phục địa chỉ này?',
                                            onConfirm: handleRestoreAddress,
                                        });
                                    }}
                                    className="bg-black/50 border border-blue-600 p-2 text-blue-300 font-bold rounded hover:text-white hover:bg-blue-400/50"
                                    title="Khôi phục địa chỉ"
                                >
                                    <MdRestore size={22} />
                                </button>
                                <button
                                    onClick={() => {
                                        setConfirmAction({
                                            isOpen: true,
                                            type: 'permanentDelete',
                                            addressId: address._id,
                                            message:
                                                'Bạn có chắc chắn muốn xóa vĩnh viễn địa chỉ này? Hành động này không thể hoàn tác!',
                                            onConfirm: handlePermanentDelete,
                                        });
                                    }}
                                    className="bg-black/50 border border-rose-600 p-2 text-rose-300 font-bold rounded hover:text-white hover:bg-rose-400/50"
                                    title="Xóa vĩnh viễn"
                                >
                                    <IoMdTrash size={22} />
                                </button>
                            </div>
                        </div>
                    ))}
                </Card>
            )}

            {openAddress && <AddAddress close={() => setOpenAddress(false)} />}

            {openEdit && (
                <EditAddressDetails
                    data={editData}
                    close={() => setOpenEdit(false)}
                />
            )}

            {confirmAction.isOpen && (
                <ConfirmBox
                    cancel={() =>
                        setConfirmAction((prev) => ({ ...prev, isOpen: false }))
                    }
                    confirm={async () => {
                        try {
                            await confirmAction.onConfirm(
                                confirmAction.addressId
                            );
                            setConfirmAction((prev) => ({
                                ...prev,
                                isOpen: false,
                            }));
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    }}
                    close={() =>
                        setConfirmAction((prev) => ({ ...prev, isOpen: false }))
                    }
                    title="Xác nhận"
                    message={confirmAction.message}
                    confirmText={
                        confirmAction.type === 'delete'
                            ? 'Xóa'
                            : confirmAction.type === 'restore'
                            ? 'Khôi phục'
                            : 'Xóa vĩnh viễn'
                    }
                    cancelText="Hủy"
                />
            )}
        </section>
    );
};

export default Address;
