import "./Login.css";
import logo from "../../assets/Asset 2.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/feature/userSlice";
import toast from "react-hot-toast";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const res = dispatch(
        loginUser({ username: data.username, password: data.password })
      );
      console.log(res);
      
        navigate("/");
      
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="bg-[#7B9FF9] w-screen h-screen flex justify-center items-center">
      <div className="loginBackgroundImg px-[40px] pt-[10px]">
        {/* Logo */}
        <img src={logo} alt="" className="w-[183px] h-[105px] object-cover" />

        {/* Login Form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-[18px] flex flex-col items-center"
        >
          <div className="bg-[#A7C8FC] shadow-black">
            <input
              type="text"
              placeholder="user name"
              {...register("username")}
              className="h-[40px] w-[242px] px-4 mb-[5px] mr-[5px] focus:outline-none"
            />
          </div>

          <div className="bg-[#A7C8FC] shadow-black mt-[18px]">
            <input
              type="password"
              placeholder="password"
              {...register("password")}
              className="h-[40px] w-[242px] px-4 mb-[5px] mr-[5px] focus:outline-none"
            />
          </div>

          <div className="form-control mt-[21px] border">
            <label className="flex items-center gap-[8px] cursor-pointer">
              <input type="checkbox" checked="checked" className="" />
              <span className="label-text">Remember me</span>
            </label>
          </div>

          <div className="bg-[#A7C8FC] w-[128px] mt-2">
            <button
              type="submit"
              className="w-[128px] h-[46px] bg-[#826DF6] text-[20px] text-white font-[700] mb-[8px] ml-[-10px]"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
