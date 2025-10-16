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
                toast.success('Address Restored');
                if (fetchAddress) {
                    fetchAddress();
                }
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className="container mx-auto lg:py-4 py-2 px-1 flex flex-col">
            <div
                className="p-3 mb-3 bg-primary-4 rounded-md shadow-md shadow-secondary-100
            font-bold text-secondary-200 sm:text-lg text-sm uppercase flex justify-between
            items-center gap-2"
            >
                <h2 className="text-ellipsis line-clamp-1">Địa chỉ</h2>
                <button
                    onClick={() => setOpenAddress(true)}
                    className="bg-primary-2 border-[3px] border-secondary-200 text-secondary-200 px-3 hover:opacity-80
                 py-1 rounded-full text-xs"
                >
                    Thêm Mới
                </button>
            </div>

            {/* Danh sách địa chỉ hiện hoạt */}
            <div
                className="bg-white p-2 grid gap-4 overflow-auto max-h-[calc(100vh/1.5)]"
            >
                {activeAddresses.length === 0 ? (
                    <p className="text-gray-500">
                        Chưa có địa chỉ. Hãy thêm địa chỉ mới
                    </p>
                ) : (
                    activeAddresses.map((address, index) => (
                        <div
                            key={index}
                            className="border border-secondary-100 rounded-md px-2 sm:px-4 py-3 hover:bg-base-100
                        shadow-md cursor-pointer"
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
                                        <span className="text-secondary-200 text-[10px] sm:text-lg font-bold">
                                            (*)
                                        </span>
                                    )}
                                </div>
                                {/* PC / Tablet */}
                                <div className="sm:flex hidden items-center gap-3">
                                    <button
                                        onClick={() => {
                                            setOpenEdit(true);
                                            setEditData(address);
                                        }}
                                        className="shadow-md shadow-secondary-100 rounded hover:opacity-80 p-[3px] text-primary-200"
                                    >
                                        <MdEdit size={18} />
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
                                                className="shadow-md shadow-secondary-100 rounded hover:opacity-80 p-[3px] text-secondary-200"
                                            >
                                                <MdDelete size={18} />
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
                                        className="shadow-md shadow-secondary-100 rounded hover:opacity-80 p-[1px] text-primary-200"
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
                                        className="shadow-md shadow-secondary-100 rounded hover:opacity-80 p-[1px] text-secondary-200"
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
                <div className="bg-white p-2 grid gap-4 mt-4">
                    <h3 className="text-lg font-bold shadow-md px-2 py-3 text-secondary-200">
                        Địa chỉ đã xóa
                    </h3>
                    {deletedAddresses.map((address, index) => (
                        <div
                            key={index}
                            className="border border-secondary-100 rounded-md px-2 sm:px-4 py-3 hover:bg-base-100
                        shadow-md cursor-pointer opacity-60 flex justify-between"
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
                                    className="bg-blue-200 p-2 text-blue-900 font-bold rounded hover:text-white hover:bg-blue-400"
                                >
                                    <MdRestore size={22} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
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
                        confirmAction.type === 'delete' ? 'Xóa' : 'Khôi phục'
                    }
                    cancelText="Hủy"
                />
            )}
        </section>
    );
};

export default Address;
