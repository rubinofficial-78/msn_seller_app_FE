import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../../components/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyById, updateCompany } from "../../../redux/Action/action";
import { RootState } from "../../../redux/types";
import GLOBAL_CONSTANTS from "../../../GlobalConstants";
import { toast } from "react-toastify";

interface ColorConfig {
  headerBackground: string;
  headerText: string;
  buttonBackground: string;
  buttonText: string;
  tableHeader: string;
  tableHeaderText: string;
}

const ThemeCustomisation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: companyData, loading, error } = useSelector((state: RootState) => state.data.companyDetails);
  
  const [colors, setColors] = useState<ColorConfig>({
    headerBackground: "#1F2937",
    headerText: "#FFFFFF",
    buttonBackground: "#1D4ED8",
    buttonText: "#FFFFFF",
    tableHeader: "#E5E7EB",
    tableHeaderText: "#000000",
  });

  const [currentImages, setCurrentImages] = useState({
    logo: "",
    favicon: "",
  });

  useEffect(() => {
    if (GLOBAL_CONSTANTS.company_id) {
      dispatch(getCompanyById(GLOBAL_CONSTANTS.company_id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (companyData?.partner_company?.[0]) {
      const partner = companyData.partner_company[0];
      const headerStyle = partner.header_style || {};
      const buttonStyle = partner.button_style || {};
      const tableStyle = partner.table_style || {};

      setColors({
        headerBackground: headerStyle.background_color || "#1F2937",
        headerText: headerStyle.text_color || "#FFFFFF",
        buttonBackground: buttonStyle.background_color || "#1D4ED8",
        buttonText: buttonStyle.text_color || "#FFFFFF",
        tableHeader: tableStyle.head_background_color || "#E5E7EB",
        tableHeaderText: tableStyle.head_text_color || "#000000",
      });

      setCurrentImages({
        logo: headerStyle.logo || "",
        favicon: partner.favicon_icon || "",
      });
    }
  }, [companyData]);

  const handleColorChange = (key: keyof ColorConfig, value: string) => {
    setColors((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageLink = (id: string, imageUrl: string) => {
    if (id === "logo-image-upload") {
      setCurrentImages((prev) => ({
        ...prev,
        logo: imageUrl,
      }));
    } else if (id === "favicon-image-upload") {
      setCurrentImages((prev) => ({
        ...prev,
        favicon: imageUrl,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        favicon_icon: currentImages.favicon,
        header_style: {
          background_color: colors.headerBackground,
          text_color: colors.headerText,
          logo: currentImages.logo
        },
        table_style: {
          head_background_color: colors.tableHeader,
          head_text_color: colors.tableHeaderText
        },
        font_family: {
          font_family: "Roboto"
        },
        button_style: {
          background_color: colors.buttonBackground,
          text_color: colors.buttonText
        },
        company_images: [
          currentImages.logo
        ]
      };

      await dispatch(updateCompany(GLOBAL_CONSTANTS.company_id, payload));
      toast.success('Theme updated successfully');
      dispatch(getCompanyById(GLOBAL_CONSTANTS.company_id)); // Refresh data
    } catch (error) {
      toast.error('Failed to update theme');
    }
  };

  const ColorInput = ({
    label,
    colorKey,
    value,
  }: {
    label: string;
    colorKey: keyof ColorConfig;
    value: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            value={value || "#000000"}
            onChange={(e) => handleColorChange(colorKey, e.target.value)}
            className="w-12 h-12 rounded cursor-pointer border p-1"
          />
        </div>
        <input
          type="text"
          value={(value || "#000000").toUpperCase()}
          onChange={(e) => handleColorChange(colorKey, e.target.value)}
          className="border rounded px-3 py-2 w-32 text-sm"
          placeholder="#000000"
        />
      </div>
    </div>
  );

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard/company-settings")}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">UI Configuration</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Upload Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Upload Your Logo</h2>
            <div className="flex gap-4 items-start">
              <ImageUpload
                id="logo-image-upload"
                value={currentImages.logo}
                label="Upload Your Logo"
                handleImageLink={handleImageLink}
                showLable={false}
                text="For the logo image, please ensure it has a transparent background. Additionally, the file size should not exceed 10 megabytes. Accepted formats include PNG, SVG."
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Browser Favicon Image</h2>
            <div className="flex gap-4 items-start">
              <ImageUpload
                id="favicon-image-upload"
                value={currentImages.favicon}
                label="Browser Favicon Image"
                handleImageLink={handleImageLink}
                showLable={false}
                text="For the favicon image, please ensure it has a transparent background. Additionally, the file size should not exceed 10 megabytes. Accepted formats include PNG, ICO."
              />
            </div>
          </div>
        </div>

        {/* Color Configuration Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Choose Your Brand Colors</h2>

          <div className="space-y-6">
            {/* Header Colors */}
            <div className="p-4 bg-white rounded-lg shadow-sm border">
              <h3 className="font-medium mb-4">Header Colors</h3>
              <div className="space-y-4">
                <ColorInput
                  label="Background Color"
                  colorKey="headerBackground"
                  value={colors.headerBackground}
                />
                <ColorInput
                  label="Text Color"
                  colorKey="headerText"
                  value={colors.headerText}
                />
              </div>
            </div>

            {/* Button Colors */}
            <div className="p-4 bg-white rounded-lg shadow-sm border">
              <h3 className="font-medium mb-4">Button Colors</h3>
              <div className="space-y-4">
                <ColorInput
                  label="Background Color"
                  colorKey="buttonBackground"
                  value={colors.buttonBackground}
                />
                <ColorInput
                  label="Text Color"
                  colorKey="buttonText"
                  value={colors.buttonText}
                />
              </div>
            </div>

            {/* Table Colors */}
            <div className="p-4 bg-white rounded-lg shadow-sm border">
              <h3 className="font-medium mb-4">Table Colors</h3>
              <div className="space-y-4">
                <ColorInput
                  id="table-header-background-color-input"
                  label="Header Background"
                  colorKey="tableHeader"
                  value={colors.tableHeader}
                />
                <ColorInput
                  id="table-header-text-color-input"
                  label="Header Text"
                  colorKey="tableHeaderText"
                  value={colors.tableHeaderText}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-8">
        <button
          id="update-button-theme"
          onClick={handleSubmit}
          className="bg-red-900 text-white px-6 py-2 rounded-md hover:bg-red-800 transition-colors"
        >
          UPDATE
        </button>
      </div>
    </div>
  );
};

export default ThemeCustomisation;
