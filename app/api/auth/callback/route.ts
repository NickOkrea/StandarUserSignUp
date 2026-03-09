import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");
	const next = requestUrl.searchParams.get("next");
	const type = requestUrl.searchParams.get("type");
	const errorCode = requestUrl.searchParams.get("error_code");
	const origin = requestUrl.origin;

	console.log("🔍 [Callback] URL completa:", request.url);
	console.log("🔍 [Callback] code:", code);
	console.log("🔍 [Callback] next:", next);
	console.log("🔍 [Callback] type:", type);
	console.log("🔍 [Callback] errorCode:", errorCode);

	// Si Supabase devuelve un error (link expirado, ya usado, etc.)
	if (errorCode) {
		console.log("❌ [Callback] Error detectado:", errorCode);
		if (type === "recovery") {
			if (errorCode === "otp_expired") {
				return NextResponse.redirect(
					`${origin}/forgot-password?error=El+link+ha+expirado.+Solicita+uno+nuevo.`
				);
			}
			return NextResponse.redirect(`${origin}/forgot-password?error=El+link+es+invalido.+Solicita+uno+nuevo.`);
		}
		// Para otros tipos de callback
		return NextResponse.redirect(`${origin}/login?error=Link+invalido+o+expirado.`);
	}

	if (code) {
		const supabase = await createClient();
		const { data, error } = await supabase.auth.exchangeCodeForSession(code);

		console.log("🔍 [Callback] exchangeCodeForSession result:", { data: !!data, error });

		if (!error) {
			// Si es un flujo de recuperación de contraseña, SIEMPRE redirigir al formulario
			if (type === "recovery") {
				const redirectPath = next || "/auth/update-password";
				console.log("✅ [Callback] Flujo de recuperación detectado. Redirigiendo a:", redirectPath);
				return NextResponse.redirect(`${origin}${redirectPath}`);
			}

			// Si viene con un `next` (ej: otros flujos), redirigir ahí
			if (next) {
				console.log("✅ [Callback] Redirigiendo a:", next);
				return NextResponse.redirect(`${origin}${next}`);
			}

			// Verificar el rol del usuario en profiles
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (user) {
				const { data: profile } = await supabase
					.from("profiles")
					.select("rol")
					.eq("id", user.id)
					.single();

				// Redirigir según el rol
				if (profile?.rol === "administrador") {
					return NextResponse.redirect(`${origin}/admin`);
				} else if (profile?.rol === "chofer") {
					return NextResponse.redirect(`${origin}/driver`);
				}
			}

			// Si no tiene perfil o rol, redirigir al login
			return NextResponse.redirect(`${origin}/login`);
		} else {
			// Si hay error pero es un flujo de recuperación de contraseña
			if (type === "recovery") {
				console.log("❌ [Callback] Error en recuperación de contraseña:", error);
				return NextResponse.redirect(
					`${origin}/forgot-password?error=${encodeURIComponent('El link ha expirado o es inválido. Solicita uno nuevo.')}`
				);
			}
		}
	}

	// Si hay error, redirigir al login
	return NextResponse.redirect(`${origin}/login`);
}
