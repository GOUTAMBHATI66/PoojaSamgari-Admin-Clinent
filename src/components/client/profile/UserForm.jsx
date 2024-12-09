import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AxiosBase from "@/lib/axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";

const UserForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phonenumber: "",
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [initialPhoneNumber, setInitialPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [showReenter, setShowReenter] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const { data } = await AxiosBase.get("/auth/me");
        setFormData(data);
        setInitialPhoneNumber(data.phonenumber || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phonenumber: value,
    }));
    if (value !== initialPhoneNumber) {
      setShowReenter(true);
      setPhoneError(false);
    } else {
      setShowReenter(false);
    }
  };

  const handleReenterPhoneChange = (value) => {
    setInitialPhoneNumber(value);
    setPhoneError(false);

    if (value === formData.phonenumber) {
      setShowReenter(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showReenter && formData.phonenumber !== initialPhoneNumber) {
      setPhoneError(true);
      toast.error("Phone number does not match the re-entered value.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await AxiosBase.put(
        `/api/store/user/address/${formData.id}`,
        formData
      );
      if (data.success) {
        toast.success("User address updated." || data.message);
      }
    } catch (error) {
      console.error("Error updating user address:", error);
      toast.error("An error occurred while updating the user address.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="p-6 max-w-3xl w-full">
      <h2 className="text-xl font-semibold text-center mb-4">
        Add Shipping Address
      </h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              placeholder="Email Address"
              disabled
            />
          </div>
          <div className="row-span-1">
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700"
            >
              Street
            </label>
            <Input
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Street Address"
              required
            />
          </div>
          <div className="row-span-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
          </div>
          <div className="row-span-1">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State
            </label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              required
            />
          </div>
          <div className="row-span-1">
            <label
              htmlFor="postalCode"
              className="block text-sm font-medium text-gray-700"
            >
              Postal Code
            </label>
            <Input
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
              required
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              required
            />
          </div>
          <div className="col-span-2 space-y-3">
            <label
              htmlFor="phonenumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <PhoneInput
              inputProps={{
                id: "phonenumber",
                name: "phonenumber",
                required: true,
                placeholder: "Enter phone number",
              }}
              className={`bg-background w-full ${
                phoneError ? "border-red-500" : ""
              }`}
              country={"in"}
              onlyCountries={["in"]}
              value={formData.phonenumber}
              onChange={handlePhoneChange}
              inputStyle={{
                width: "100%",
                height: "40px",
                fontSize: "16px",
                color: "black",
                borderRadius: "0.375rem",
                border: "1px solid #e5e7eb",
                background: "#fff9ed",
              }}
              containerClass="react-phone-input-container"
            />
            {showReenter && (
              <div>
                <label
                  htmlFor="reenterPhone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Re-enter Phone Number
                </label>
                <PhoneInput
                  inputProps={{
                    id: "reenterPhone",
                    name: "reenterPhone",
                    required: true,
                    placeholder: "Re-enter phone number",
                  }}
                  className={`bg-background w-full ${
                    phoneError ? "border-red-500" : ""
                  }`}
                  country={"in"}
                  onlyCountries={["in"]}
                  value={initialPhoneNumber}
                  onChange={handleReenterPhoneChange}
                  inputStyle={{
                    width: "100%",
                    height: "40px",
                    fontSize: "16px",
                    color: "black",
                    borderRadius: "0.375rem",
                    border: "1px solid #e5e7eb",
                    background: "#fff9ed",
                  }}
                />
                {phoneError && (
                  <p className="text-red-500 text-sm mt-2">
                    Phone number does not match the initial value.
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="col-span-2">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Updating..." : "Update Address"}
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
};

export default UserForm;
