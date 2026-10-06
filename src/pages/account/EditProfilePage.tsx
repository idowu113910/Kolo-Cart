import React, { useRef, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
} from "@ionic/react";
import { useNavigate } from "react-router-dom";
import {
  arrowBack,
  cameraOutline,
  imagesOutline,
  cloudOutline,
} from "ionicons/icons";
import { useUserStore } from "../../store/userStore";
import { Button } from "../../components/Button";

const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

const fileToAvatarDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the file"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Invalid image"));
      img.onload = () => {
        const max = 400;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported"));
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });

export const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useUserStore();

  const [title, setTitle] = useState(profile.title);
  const [fullName, setFullName] = useState(profile.fullName);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [menuOpen, setMenuOpen] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const driveInputRef = useRef<HTMLInputElement>(null);

  const photoOptions = [
    { label: "Take Photo", icon: cameraOutline, ref: cameraInputRef },
    { label: "Choose from Gallery", icon: imagesOutline, ref: galleryInputRef },
    { label: "Choose from Drive", icon: cloudOutline, ref: driveInputRef },
  ];

  const openPicker = (ref: React.RefObject<HTMLInputElement | null>) => {
    setMenuOpen(false);
    ref.current?.click();
  };

  const handlePhotoSelected = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // lets the user pick the same file again
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setPhotoError("Please choose a PNG or JPEG image.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setPhotoError(`Image must be under ${MAX_SIZE_MB}MB.`);
      return;
    }

    try {
      setAvatarUrl(await fileToAvatarDataUrl(file));
      setPhotoError("");
    } catch {
      setPhotoError("Could not load that image. Try another one.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      title,
      fullName,
      phone,
      email,
      avatarUrl,
    });
    navigate(-1);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    backgroundColor: "#F8FAFC",
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    fontSize: "14px",
    color: "#1E293B",
    boxSizing: "border-box",
    outline: "none",
  };

  return (
    <IonPage className="kolocart-edit-profile-page">
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ padding: "8px 12px 4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{
                border: "none",
                background: "none",
                color: "#162544",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Go back"
            >
              <IonIcon icon={arrowBack} style={{ fontSize: "22px" }} />
            </button>

            <h1
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: "800",
                color: "#162544",
              }}
            >
              Edit Profile
            </h1>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form
          onSubmit={handleSubmit}
          style={{ padding: "16px", maxWidth: "640px", margin: "0 auto" }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              padding: "24px 18px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
            }}
          >
            {/* Avatar with Camera Overlay */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={avatarUrl}
                  alt={profile.fullName}
                  style={{
                    width: "84px",
                    height: "84px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #162544",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "#162544",
                    color: "#FFFFFF",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                    border: "2px solid #FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  aria-label="Change photo"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                >
                  <IonIcon icon={cameraOutline} style={{ fontSize: "14px" }} />
                </button>

                {menuOpen && (
                  <>
                    {/* Invisible backdrop: tapping outside closes the menu */}
                    <div
                      onClick={() => setMenuOpen(false)}
                      style={{ position: "fixed", inset: 0, zIndex: 10 }}
                    />
                    <div
                      role="menu"
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "220px",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E2E8F0",
                        borderRadius: "14px",
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                        padding: "6px",
                        zIndex: 20,
                      }}
                    >
                      {photoOptions.map((option) => (
                        <button
                          key={option.label}
                          type="button"
                          role="menuitem"
                          onClick={() => openPicker(option.ref)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            width: "100%",
                            padding: "10px 12px",
                            border: "none",
                            background: "none",
                            borderRadius: "10px",
                            fontSize: "14px",
                            color: "#162544",
                            textAlign: "left",
                            cursor: "pointer",
                          }}
                        >
                          <IonIcon
                            icon={option.icon}
                            style={{ fontSize: "18px" }}
                          />
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {photoError && (
                <p
                  style={{
                    margin: "10px 0 0",
                    fontSize: "12px",
                    color: "#DC2626",
                  }}
                >
                  {photoError}
                </p>
              )}

              {/* Hidden inputs, one per option */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="user"
                onChange={handlePhotoSelected}
                style={{ display: "none" }}
              />
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/png,image/jpeg"
                onChange={handlePhotoSelected}
                style={{ display: "none" }}
              />
              <input
                ref={driveInputRef}
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handlePhotoSelected}
                style={{ display: "none" }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#162544",
                  marginBottom: "6px",
                }}
              >
                Greeting Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Mrs. Helen"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#162544",
                  marginBottom: "6px",
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Helen Nkem Okeke"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#162544",
                  marginBottom: "6px",
                }}
              >
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#162544",
                  marginBottom: "6px",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth>
              Save Changes
            </Button>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default EditProfilePage;
