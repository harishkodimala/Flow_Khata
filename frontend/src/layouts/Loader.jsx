function Loader() {

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-100">

      <div className="text-center">

        {/* Logo */}

        <div className="relative mx-auto w-20 h-20">

          <div
            className="
              absolute inset-0
              rounded-full
              border-4
              border-indigo-600
              border-t-transparent
              animate-spin
            "
          />

          <div
            className="
              absolute inset-3
              rounded-full
              bg-indigo-600
              text-white
              flex items-center
              justify-center
              font-black
              text-2xl
            "
          >

            K

          </div>

        </div>

        {/* Text */}

        <h2 className="mt-6 text-2xl font-bold text-slate-800">

          Khata Flow

        </h2>

        <p className="mt-2 text-slate-500">

          Loading your data...

        </p>

      </div>

    </div>

  );

}

export default Loader;