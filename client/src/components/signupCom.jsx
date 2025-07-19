import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ApiConstants from "../constants/apiConstants";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Stethoscope,
  Building,
  ArrowRight,
  Heart,
  Weight
} from "lucide-react";
import PropTypes from "prop-types";

// Schema Generator
const getSchema = (userType) => {
  switch (userType) {
    case "doctor":
      return z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        dob: z.string().refine((val) => !isNaN(new Date(val).getTime()), { message: "Invalid DOB" }),
        gender: z.enum(["Male", "Female", "Other"]),
        address: z.string().min(5),
        mobileNumber: z.string().regex(/^\d{10}$/),
        degree: z.string().min(2),
        specialization: z.string().min(2),
        experience: z.coerce.number().min(0),
        licenseData: z.string().min(2),
      });

    case "hospital":
      return z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        address: z.string().min(5),
        mobileNumber: z.string().regex(/^\d{10}$/),
        licenseData: z.string().min(2),
      });

    case "patient":
      return z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        dob: z.string().refine((val) => !isNaN(new Date(val).getTime()), { message: "Invalid DOB" }),
        gender: z.enum(["Male", "Female", "Other"]),
        country: z.string().optional(),
        province: z.string().optional(),
        city: z.string().optional(),
        address: z.string().optional(),
        mobileNumber: z.string().regex(/^\d{10}$/),
        weight: z.coerce.number().optional(),
        bloodSign: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
        familyDoctor: z.string().optional(),
        emergencyNumber: z.string().optional(),
      });

    default:
      return z.object({});
  }
};

const SignupComponent = ({ userType }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = getSchema(userType);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(ApiConstants[`API_REGISTER_${userType.toUpperCase()}`], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Registration failed");

      const result = await response.json();
      Cookies.set("jwt", result.token, { secure: true, sameSite: "strict", expires: 1 });
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const Field = ({ name, label, type = "text", icon: Icon, placeholder }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-700 font-medium text-sm">{label}</FormLabel>
          <FormControl>
            <div className="relative group">
              {Icon && (
                <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-200 pointer-events-none" />
              )}
              {type === "password" ? (
                <>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder || `Enter ${label.toLowerCase()}`}
                    className={`${Icon ? 'pl-11' : 'pl-4'} pr-11 h-12 bg-gray-50/50 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 hover:bg-gray-50`}
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-emerald-500 hover:bg-transparent transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </>
              ) : (
                <Input
                  type={type}
                  placeholder={placeholder || `Enter ${label.toLowerCase()}`}
                  className={`${Icon ? 'pl-11' : 'pl-4'} h-12 bg-gray-50/50 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 hover:bg-gray-50`}
                  {...field}
                />
              )}
            </div>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );

  const GenderSelect = () => (
    <Controller
      control={form.control}
      name="gender"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-700 font-medium text-sm">Gender</FormLabel>
          <FormControl>
            <div className="relative">
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="h-12 bg-gray-50/50 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 hover:bg-gray-50">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );

  const BloodGroupSelect = () => (
    <Controller
      control={form.control}
      name="bloodSign"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-700 font-medium text-sm">Blood Group</FormLabel>
          <FormControl>
            <div className="relative">
              <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10 pointer-events-none" />
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="pl-11 h-12 bg-gray-50/50 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 hover:bg-gray-50">
                  <SelectValue placeholder="Select Blood Group" />
                </SelectTrigger>
                <SelectContent>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((g) => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );

  const renderFields = () => {
    switch (userType) {
      case "doctor":
        return (
          <>
            <Field name="name" label="Full Name" icon={User} placeholder="Dr. John Smith" />
            <Field name="email" label="Email" type="email" icon={Mail} placeholder="doctor@hospital.com" />
            <Field name="mobileNumber" label="Mobile Number" icon={Phone} placeholder="1234567890" />
            <Field name="address" label="Address" icon={MapPin} placeholder="123 Medical Street" />
            <Field name="password" label="Password" type="password" icon={Lock} placeholder="••••••••" />
            <Field name="dob" label="Date of Birth" type="date" icon={Calendar} />
            <GenderSelect />
            <Field name="degree" label="Degree" icon={GraduationCap} placeholder="MBBS" />
            <Field name="specialization" label="Specialization" icon={Stethoscope} placeholder="Cardiology" />
            <Field name="experience" label="Experience (Years)" placeholder="5" />
            <Field name="licenseData" label="License Data" placeholder="License Number" />
          </>
        );
      case "hospital":
        return (
          <>
            <Field name="name" label="Hospital Name" icon={Building} placeholder="City General Hospital" />
            <Field name="email" label="Email" icon={Mail} placeholder="admin@hospital.com" />
            <Field name="password" label="Password" type="password" icon={Lock} placeholder="••••••••" />
            <Field name="address" label="Address" icon={MapPin} placeholder="123 Hospital Street" />
            <Field name="mobileNumber" label="Mobile Number" icon={Phone} placeholder="1234567890" />
            <Field name="licenseData" label="License Data" placeholder="Hospital License Number" />
          </>
        );
      case "patient":
        return (
          <>
            <Field name="name" label="Full Name" icon={User} placeholder="John Doe" />
            <Field name="email" label="Email" icon={Mail} placeholder="patient@email.com" />
            <Field name="password" label="Password" type="password" icon={Lock} placeholder="••••••••" />
            <Field name="dob" label="Date of Birth" type="date" icon={Calendar} />
            <GenderSelect />
            <Field name="country" label="Country" icon={MapPin} placeholder="United States" />
            <Field name="province" label="Province" icon={MapPin} placeholder="California" />
            <Field name="city" label="City" icon={MapPin} placeholder="Los Angeles" />
            <Field name="address" label="Address" icon={MapPin} placeholder="123 Main Street" />
            <Field name="mobileNumber" label="Mobile Number" icon={Phone} placeholder="1234567890" />
            <Field name="weight" label="Weight (kg)" icon={Weight} placeholder="70" />
            <BloodGroupSelect />
            <Field name="familyDoctor" label="Family Doctor" icon={Stethoscope} placeholder="Dr. Smith" />
            <Field name="emergencyNumber" label="Emergency Number" icon={Phone} placeholder="Emergency contact" />
          </>
        );
      default:
        return (
          <div className="col-span-full">
            <div className="text-center p-8 bg-red-50 rounded-xl border border-red-200">
              <p className="text-red-600 font-medium">Invalid user type in URL</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="px-8 pt-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          {userType.charAt(0).toUpperCase() + userType.slice(1)} Registration
        </h1>
        <p className="text-gray-600 mt-2">Create your account to get started</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderFields()}
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Button
            variant="link"
            className="p-0 h-auto text-emerald-600 hover:text-emerald-700 font-semibold hover:no-underline transition-colors duration-200"
            onClick={() => navigate("/login")}
          >
            Sign in here
          </Button>
        </p>
      </div>
    </div>
  );
};

SignupComponent.propTypes = {
  userType: PropTypes.string.isRequired,
};

export default SignupComponent;