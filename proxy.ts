import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) =>
						request.cookies.set(name, value),
					);
					response = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						response.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const isAuthPage = request.nextUrl.pathname.startsWith("/auth/login") ||
		request.nextUrl.pathname.startsWith("/auth/sign-up");
	const isAdminPage = request.nextUrl.pathname.startsWith("/admin");
	const isDriverPage = request.nextUrl.pathname.startsWith("/driver");
	const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

	// Si no está autenticado y trata de acceder a páginas protegidas
	if (!user && (isAdminPage || isDriverPage || isDashboardPage)) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}

	// Si está autenticado y necesita verificación de rol (rutas protegidas o redirección desde auth)
	if (user && (isAdminPage || isDriverPage || isAuthPage)) {
		const { data: profile } = await supabase
			.from("profiles")
			.select("rol")
			.eq("id", user.id)
			.single();

		const rol = profile?.rol;

		if (isAdminPage || isDriverPage) {
			// Si no tiene un rol válido, evitar el loop redirigiendo a dashboard
			if (rol !== "administrador" && rol !== "chofer") {
				return NextResponse.redirect(new URL("/dashboard", request.url));
			}

			// Si intenta acceder a admin sin ser administrador
			if (isAdminPage && rol !== "administrador") {
				return NextResponse.redirect(new URL("/driver", request.url));
			}

			// Si intenta acceder a driver sin ser chofer
			if (isDriverPage && rol !== "chofer") {
				return NextResponse.redirect(new URL("/admin", request.url));
			}
		}

		// Si está autenticado y trata de acceder a login/signup, redirigir según rol
		if (isAuthPage) {
			if (rol === "administrador") {
				return NextResponse.redirect(new URL("/admin", request.url));
			} else if (rol === "chofer") {
				return NextResponse.redirect(new URL("/driver", request.url));
			}
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}
	}

	return response;
}

export const config = {
	matcher: [
		"/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
