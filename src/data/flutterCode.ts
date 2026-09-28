export interface FlutterFile {
  name: string;
  path: string;
  description: string;
  content: string;
}

export const FLUTTER_CODE_FILES: FlutterFile[] = [
  {
    name: 'pubspec.yaml',
    path: 'pubspec.yaml',
    description: 'Flutter dependencies including Material 3, camera, and icons',
    content: `name: agrivision
description: "AI-Powered Onion Grading & Occlusion Detection App for Smart India Hackathon."
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.3.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  camera: ^0.10.5+9
  google_fonts: ^6.2.1
  fl_chart: ^0.68.0
  intl: ^0.19.0
  share_plus: ^9.0.0
  path_provider: ^2.1.2
  crypto: ^3.0.3

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/
`,
  },
  {
    name: 'main.dart',
    path: 'lib/main.dart',
    description: 'Application entry point with Material 3 Theme setup and route table',
    content: `import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'theme/app_theme.dart';
import 'screens/auth_screen.dart';
import 'screens/dashboard_screen.dart';
import 'screens/smart_scan_screen.dart';
import 'screens/quality_report_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);
  runApp(const AgriVisionApp());
}

class AgriVisionApp extends StatelessWidget {
  const AgriVisionApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AgriVision',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.light,
      initialRoute: '/auth',
      routes: {
        '/auth': (context) => const AuthScreen(),
        '/dashboard': (context) => const DashboardScreen(),
        '/scan': (context) => const SmartScanScreen(),
        '/report': (context) => const QualityReportScreen(),
      },
    );
  }
}
`,
  },
  {
    name: 'app_theme.dart',
    path: 'lib/theme/app_theme.dart',
    description: 'Material 3 design system with leaf green (#2E7D32), earth tones, and typography',
    content: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Agricultural Color Palette
  static const Color leafGreenPrimary = Color(0xFF2E7D32); // Lush foliage
  static const Color leafGreenContainer = Color(0xFFE8F5E9);
  static const Color earthBrownSecondary = Color(0xFF795548); // Rich soil
  static const Color earthContainer = Color(0xFFEFEBE9);
  static const Color onionRedAccent = Color(0xFFC2185B); // Nashik red onion
  static const Color backgroundLight = Color(0xFFF9FBF8);
  static const Color surfaceLight = Colors.white;

  // Defect Severity Accents
  static const Color defectRottenRed = Color(0xFFD32F2F);
  static const Color defectSproutedGreen = Color(0xFF00897B);
  static const Color defectUndersizedYellow = Color(0xFFF57F17);

  static ThemeData get lightTheme {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: leafGreenPrimary,
      primary: leafGreenPrimary,
      secondary: earthBrownSecondary,
      surface: surfaceLight,
      surfaceTint: Colors.transparent,
      brightness: Brightness.light,
    );

    final textTheme = GoogleFonts.plusJakartaSansTextTheme();

    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: backgroundLight,
      textTheme: textTheme,
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: false,
        iconTheme: IconThemeData(color: Color(0xFF1E293B)),
      ),
      cardTheme: CardTheme(
        color: surfaceLight,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: const BorderSide(color: Color(0xFFE2E8F0), width: 1),
        ),
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
          textStyle: GoogleFonts.plusJakartaSans(
            fontWeight: FontWeight.w600,
            fontSize: 16,
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: const Color(0xFFF1F5F0),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: leafGreenPrimary, width: 2),
        ),
      ),
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: leafGreenPrimary,
        brightness: Brightness.dark,
      ),
      textTheme: GoogleFonts.plusJakartaSansTextTheme(ThemeData.dark().textTheme),
    );
  }
}
`,
  },
  {
    name: 'onion_scan_model.dart',
    path: 'lib/models/onion_scan_model.dart',
    description: 'Data models for onion inspection, defects breakdown, and bounding boxes',
    content: `class OnionScanReport {
  final String id;
  final String lotNumber;
  final DateTime timestamp;
  final String farmerName;
  final String mandiLocation;
  final double gradeAPercentage;
  final double ursPercentage; // Under-grade / Defective
  final DefectBreakdown defects;
  final int totalCount;
  final double estimatedPricePerKg;
  final String topViewImagePath;
  final String bottomViewImagePath;
  final List<DefectBox> topBoxes;
  final List<DefectBox> bottomBoxes;
  final String blockchainHash;

  OnionScanReport({
    required this.id,
    required this.lotNumber,
    required this.timestamp,
    required this.farmerName,
    required this.mandiLocation,
    required this.gradeAPercentage,
    required this.ursPercentage,
    required this.defects,
    required this.totalCount,
    required this.estimatedPricePerKg,
    required this.topViewImagePath,
    required this.bottomViewImagePath,
    required this.topBoxes,
    required this.bottomBoxes,
    required this.blockchainHash,
  });
}

class DefectBreakdown {
  final double rotten; // Red indicator
  final double sprouted; // Green indicator
  final double undersized; // Yellow indicator

  DefectBreakdown({
    required this.rotten,
    required this.sprouted,
    required this.undersized,
  });
}

enum DefectType { rotten, sprouted, undersized }

class DefectBox {
  final String id;
  final double x; // normalized 0..1
  final double y; // normalized 0..1
  final double width; // normalized 0..1
  final double height; // normalized 0..1
  final DefectType type;
  final String label;
  final double confidence;

  DefectBox({
    required this.id,
    required this.x,
    required this.y,
    required this.width,
    required this.height,
    required this.type,
    required this.label,
    required this.confidence,
  });
}
`,
  },
  {
    name: 'auth_screen.dart',
    path: 'lib/screens/auth_screen.dart',
    description: 'Screen 1: Clean authentication with phone number, OTP trigger, and role dropdown',
    content: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  final _phoneController = TextEditingController();
  final _otpController = TextEditingController();
  String _selectedRole = 'Farmer';
  bool _otpSent = false;
  bool _isLoading = false;

  void _handleSendOtp() {
    if (_phoneController.text.length < 10) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter a valid 10-digit mobile number')),
      );
      return;
    }
    setState(() => _otpSent = true);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Demo OTP sent: 4829 (Valid for 10 min)'),
        backgroundColor: AppTheme.leafGreenPrimary,
      ),
    );
  }

  void _handleLogin() async {
    setState(() => _isLoading = true);
    await Future.delayed(const Duration(milliseconds: 700));
    if (mounted) {
      Navigator.pushReplacementNamed(context, '/dashboard');
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 32.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 20),
              // App Logo & Brand Header
              Center(
                child: Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    color: AppTheme.leafGreenContainer,
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: AppTheme.leafGreenPrimary.withOpacity(0.12),
                        blurRadius: 20,
                        offset: const Offset(0, 8),
                      ),
                    ],
                  ),
                  child: const Icon(
                    Icons.eco_rounded,
                    size: 44,
                    color: AppTheme.leafGreenPrimary,
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Center(
                child: Text(
                  'AgriVision',
                  style: theme.textTheme.headlineMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: const Color(0xFF1E293B),
                    letterSpacing: -0.5,
                  ),
                ),
              ),
              Center(
                child: Text(
                  'AI Onion Grading & Occlusion Detection',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: const Color(0xFF64748B),
                  ),
                ),
              ),
              const SizedBox(height: 10),
              Center(
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF1F5F9),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    'Smart India Hackathon 2026',
                    style: theme.textTheme.labelSmall?.copyWith(
                      color: const Color(0xFF475569),
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 40),

              // Mobile Number Input Field
              Text(
                'Mobile Number',
                style: theme.textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w600),
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _phoneController,
                      keyboardType: TextInputType.phone,
                      maxLength: 10,
                      decoration: const InputDecoration(
                        prefixText: '+91 ',
                        hintText: '98765 43210',
                        counterText: '',
                        prefixIcon: Icon(Icons.phone_android_rounded),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  FilledButton.tonal(
                    onPressed: _handleSendOtp,
                    style: FilledButton.styleFrom(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    ),
                    child: Text(_otpSent ? 'Resend' : 'Send OTP'),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // OTP field if sent
              if (_otpSent) ...[
                Text(
                  'Enter 4-Digit OTP',
                  style: theme.textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w600),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _otpController,
                  keyboardType: TextInputType.number,
                  maxLength: 4,
                  decoration: const InputDecoration(
                    hintText: 'Demo OTP: 4829',
                    prefixIcon: Icon(Icons.lock_clock_rounded),
                  ),
                ),
                const SizedBox(height: 20),
              ],

              // Role Selection Dropdown
              Text(
                'Select Role',
                style: theme.textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w600),
              ),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                decoration: BoxDecoration(
                  color: const Color(0xFFF1F5F0),
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: _selectedRole,
                    isExpanded: true,
                    icon: const Icon(Icons.keyboard_arrow_down_rounded),
                    items: const [
                      DropdownMenuItem(
                        value: 'Farmer',
                        child: Row(
                          children: [
                            Icon(Icons.agriculture_rounded, color: AppTheme.leafGreenPrimary),
                            SizedBox(width: 12),
                            Text('Farmer (Kisan)'),
                          ],
                        ),
                      ),
                      DropdownMenuItem(
                        value: 'Mandi Buyer',
                        child: Row(
                          children: [
                            Icon(Icons.storefront_rounded, color: AppTheme.earthBrownSecondary),
                            SizedBox(width: 12),
                            Text('Mandi Buyer (Vyapari)'),
                          ],
                        ),
                      ),
                    ],
                    onChanged: (val) {
                      if (val != null) setState(() => _selectedRole = val);
                    },
                  ),
                ),
              ),
              const SizedBox(height: 32),

              // Primary Login CTA
              FilledButton(
                onPressed: _isLoading ? null : _handleLogin,
                child: _isLoading
                    ? const SizedBox(
                        height: 20,
                        width: 20,
                        child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                      )
                    : const Text('Login with AgriVision'),
              ),
              const SizedBox(height: 16),
              Center(
                child: Text(
                  'Supports Hindi, Marathi & English APMC Mandis',
                  style: theme.textTheme.bodySmall?.copyWith(color: const Color(0xFF94A3B8)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
`,
  },
  {
    name: 'dashboard_screen.dart',
    path: 'lib/screens/dashboard_screen.dart',
    description: 'Screen 2: Farmer Dashboard with greeting, market insights card, AI Scan card, and past reports',
    content: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Namaste, Ramesh Patil',
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.bold,
                color: const Color(0xFF0F172A),
              ),
            ),
            Text(
              'Lasalgaon Mandi, Nashik',
              style: theme.textTheme.bodySmall?.copyWith(
                color: const Color(0xFF64748B),
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_none_rounded),
            onPressed: () {},
          ),
          Padding(
            padding: const EdgeInsets.only(right: 16.0),
            child: CircleAvatar(
              backgroundColor: AppTheme.leafGreenContainer,
              child: const Text('RP', style: TextStyle(color: AppTheme.leafGreenPrimary, fontWeight: FontWeight.bold)),
            ),
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 12.0),
        children: [
          // Market Insights Card
          _buildMarketInsightsCard(theme),
          const SizedBox(height: 20),

          // Massive Floating AI Scan CTA Card
          _buildSmartScanCard(context, theme),
          const SizedBox(height: 28),

          // Recent Reports Section Header
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Recent Reports',
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: const Color(0xFF1E293B),
                ),
              ),
              TextButton(
                onPressed: () {},
                child: const Text('View All'),
              ),
            ],
          ),
          const SizedBox(height: 8),

          // Recent Reports List
          _buildReportTile(
            theme: theme,
            lotNo: 'LOT #ON-9428',
            date: 'Today, 10:45 AM',
            gradeAPercentage: 76.0,
            defects: 'Rotten 12% · Sprouted 7%',
            priceEst: '₹31.50/kg',
            onTap: () => Navigator.pushNamed(context, '/report'),
          ),
          _buildReportTile(
            theme: theme,
            lotNo: 'LOT #ON-9381',
            date: '26 Sep 2026',
            gradeAPercentage: 84.5,
            defects: 'Rotten 6% · Sprouted 4%',
            priceEst: '₹33.80/kg',
            onTap: () => Navigator.pushNamed(context, '/report'),
          ),
          _buildReportTile(
            theme: theme,
            lotNo: 'LOT #ON-9240',
            date: '23 Sep 2026',
            gradeAPercentage: 71.2,
            defects: 'Rotten 16% · Sprouted 8%',
            priceEst: '₹28.00/kg',
            onTap: () => Navigator.pushNamed(context, '/report'),
          ),
        ],
      ),
    );
  }

  Widget _buildMarketInsightsCard(ThemeData theme) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFE2E8F0)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.02),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                "Today's Onion Price per kg",
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: const Color(0xFF64748B),
                  fontWeight: FontWeight.w600,
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: const Color(0xFFE8F5E9),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: const Text(
                  '+₹2.20 (8.3%)',
                  style: TextStyle(
                    color: AppTheme.leafGreenPrimary,
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Row(
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              Text(
                '₹28.50',
                style: theme.textTheme.headlineMedium?.copyWith(
                  fontWeight: FontWeight.w800,
                  color: const Color(0xFF0F172A),
                ),
              ),
              const SizedBox(width: 4),
              Text(
                '/kg (Modal Price)',
                style: theme.textTheme.bodySmall?.copyWith(
                  color: const Color(0xFF94A3B8),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          const Divider(height: 1, color: Color(0xFFF1F5F9)),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _buildMinMaxText('Min Rate', '₹19.00/kg'),
              _buildMinMaxText('Max Rate', '₹34.50/kg'),
              _buildMinMaxText('Arrivals', '1,850 Tons'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMinMaxText(String title, String val) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(fontSize: 11, color: Color(0xFF94A3B8))),
        const SizedBox(height: 2),
        Text(val, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: Color(0xFF334155))),
      ],
    );
  }

  Widget _buildSmartScanCard(BuildContext context, ThemeData theme) {
    return InkWell(
      onTap: () => Navigator.pushNamed(context, '/scan'),
      borderRadius: BorderRadius.circular(24),
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFF1B5E20), Color(0xFF2E7D32)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(24),
          boxShadow: [
            BoxShadow(
              color: const Color(0xFF2E7D32).withOpacity(0.35),
              blurRadius: 20,
              offset: const Offset(0, 10),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.18),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: const Icon(
                    Icons.center_focus_strong_rounded,
                    color: Colors.white,
                    size: 32,
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.layers_rounded, color: Colors.white, size: 14),
                      SizedBox(width: 4),
                      Text(
                        'Occlusion Solver',
                        style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            Text(
              'Start Smart AI Scan',
              style: theme.textTheme.titleLarge?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              'Scan top & bottom surfaces to detect hidden rot, sprouting & under-grade bulbs.',
              style: theme.textTheme.bodySmall?.copyWith(
                color: Colors.white.withOpacity(0.85),
                height: 1.4,
              ),
            ),
            const SizedBox(height: 18),
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const Row(
                    children: [
                      Text(
                        'Launch Camera',
                        style: TextStyle(
                          color: Color(0xFF1B5E20),
                          fontWeight: FontWeight.bold,
                          fontSize: 13,
                        ),
                      ),
                      SizedBox(width: 6),
                      Icon(Icons.arrow_forward_rounded, color: Color(0xFF1B5E20), size: 16),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildReportTile({
    required ThemeData theme,
    required String lotNo,
    required String date,
    required double gradeAPercentage,
    required String defects,
    required String priceEst,
    required VoidCallback onTap,
  }) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        onTap: onTap,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        leading: Container(
          width: 48,
          height: 48,
          decoration: BoxDecoration(
            color: AppTheme.leafGreenContainer,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Center(
            child: Text(
              '\${gradeAPercentage.toStringAsFixed(0)}%',
              style: const TextStyle(
                color: AppTheme.leafGreenPrimary,
                fontWeight: FontWeight.bold,
                fontSize: 14,
              ),
            ),
          ),
        ),
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(lotNo, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
            Text(priceEst, style: const TextStyle(fontWeight: FontWeight.bold, color: AppTheme.leafGreenPrimary)),
          ],
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 4),
            Text(defects, style: const TextStyle(fontSize: 12, color: Color(0xFF64748B))),
            const SizedBox(height: 2),
            Text(date, style: const TextStyle(fontSize: 11, color: Color(0xFF94A3B8))),
          ],
        ),
        trailing: const Icon(Icons.chevron_right_rounded, color: Color(0xFF94A3B8)),
      ),
    );
  }
}
`,
  },
  {
    name: 'smart_scan_screen.dart',
    path: 'lib/screens/smart_scan_screen.dart',
    description: 'Screen 3: 3D Defect Detection Smart Scan camera flow (Video 5s vs Two-Step Photo Top & Bottom)',
    content: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

enum ScanMode { videoScan, twoStepPhoto }

class SmartScanScreen extends StatefulWidget {
  const SmartScanScreen({super.key});

  @override
  State<SmartScanScreen> createState() => _SmartScanScreenState();
}

class _SmartScanScreenState extends State<SmartScanScreen> {
  ScanMode _scanMode = ScanMode.twoStepPhoto;
  int _currentStep = 1; // 1 = Top View, 2 = Bottom View
  bool _isProcessing = false;
  String _processingStage = '';

  void _handleCapture() async {
    if (_scanMode == ScanMode.twoStepPhoto && _currentStep == 1) {
      // Prompt user to flip onions for Step 2 to solve occlusion
      setState(() {
        _currentStep = 2;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Top View captured! Now flip the onions and capture the bottom surface.'),
          duration: Duration(seconds: 3),
        ),
      );
      return;
    }

    // Step 2 captured or Video scan completed -> Run AI inference pipeline
    setState(() {
      _isProcessing = true;
      _processingStage = 'Extracting frames & detecting defects...';
    });

    await Future.delayed(const Duration(milliseconds: 900));
    setState(() {
      _processingStage = 'Aligning dual-surface occlusion geometry...';
    });

    await Future.delayed(const Duration(milliseconds: 900));
    setState(() {
      _processingStage = 'Running YOLOv8-Agri onion defect model...';
    });

    await Future.delayed(const Duration(milliseconds: 800));
    if (mounted) {
      Navigator.pushReplacementNamed(context, '/report');
    }
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // Camera Viewport Placeholder (with dark preview simulation)
          Positioned.fill(
            child: Container(
              color: const Color(0xFF121212),
              child: Image.asset(
                _currentStep == 1
                    ? 'assets/images/onion_top_view.jpg'
                    : 'assets/images/onion_bottom_view.jpg',
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) {
                  return const Center(
                    child: Icon(Icons.camera_alt_outlined, color: Colors.white30, size: 80),
                  );
                },
              ),
            ),
          ),

          // Semi-transparent Overlay with Guide Grid & Scanning Reticle
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(color: Colors.white.withOpacity(0.2), width: 1),
              ),
              child: Center(
                child: Container(
                  width: size.width * 0.82,
                  height: size.width * 0.82,
                  decoration: BoxDecoration(
                    border: Border.all(color: AppTheme.leafGreenPrimary.withOpacity(0.8), width: 2),
                    borderRadius: BorderRadius.circular(24),
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(12.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            _buildCornerTick(),
                            _buildCornerTick(),
                          ],
                        ),
                      ),
                      // Guidance badge inside camera
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                        decoration: BoxDecoration(
                          color: Colors.black54,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.crop_free_rounded, color: Colors.white, size: 16),
                            const SizedBox(width: 6),
                            Text(
                              _currentStep == 1 ? 'Keep onions flat on tray' : 'Bottom view: expose root base',
                              style: const TextStyle(color: Colors.white, fontSize: 12),
                            ),
                          ],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(12.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            _buildCornerTick(),
                            _buildCornerTick(),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),

          // Top Header & Mode Toggle
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.arrow_back_rounded, color: Colors.white),
                        onPressed: () => Navigator.pop(context),
                      ),
                      // Mode Selector Pill
                      Container(
                        padding: const EdgeInsets.all(4),
                        decoration: BoxDecoration(
                          color: Colors.black.withOpacity(0.6),
                          borderRadius: BorderRadius.circular(30),
                        ),
                        child: Row(
                          children: [
                            _buildModeButton('Two-Step Photo', ScanMode.twoStepPhoto),
                            _buildModeButton('Video Scan (5s)', ScanMode.videoScan),
                          ],
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.flash_off_rounded, color: Colors.white),
                        onPressed: () {},
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),

                  // Step Indicators (Crucial for Occlusion Solution)
                  if (_scanMode == ScanMode.twoStepPhoto)
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        _buildStepIndicator(
                          stepNumber: 1,
                          title: 'Take Top View Photo',
                          isActive: _currentStep == 1,
                          isCompleted: _currentStep > 1,
                        ),
                        Container(
                          width: 28,
                          height: 2,
                          color: _currentStep > 1 ? AppTheme.leafGreenPrimary : Colors.white24,
                        ),
                        _buildStepIndicator(
                          stepNumber: 2,
                          title: 'Flip onions & capture Bottom',
                          isActive: _currentStep == 2,
                          isCompleted: false,
                        ),
                      ],
                    ),
                ],
              ),
            ),
          ),

          // Bottom Control Area with Capture Button
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              padding: const EdgeInsets.fromLTRB(24, 24, 24, 40),
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [Colors.transparent, Colors.black87, Colors.black],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (_scanMode == ScanMode.twoStepPhoto)
                    Text(
                      _currentStep == 1
                          ? 'Step 1 of 2: Capture top surface'
                          : 'Step 2 of 2: Flip onions to detect hidden basal rot',
                      style: const TextStyle(color: Colors.white70, fontSize: 13),
                    ),
                  const SizedBox(height: 18),
                  // Shutter Button
                  GestureDetector(
                    onTap: _isProcessing ? null : _handleCapture,
                    child: Container(
                      width: 76,
                      height: 76,
                      padding: const EdgeInsets.all(5),
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(color: Colors.white, width: 3),
                      ),
                      child: Container(
                        decoration: const BoxDecoration(
                          color: AppTheme.leafGreenPrimary,
                          shape: BoxShape.circle,
                        ),
                        child: Icon(
                          _scanMode == ScanMode.videoScan ? Icons.videocam_rounded : Icons.camera_alt_rounded,
                          color: Colors.white,
                          size: 32,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Processing Indicator Dialog Overlay
          if (_isProcessing)
            Container(
              color: Colors.black.withOpacity(0.85),
              child: Center(
                child: Padding(
                  padding: const EdgeInsets.all(32.0),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const CircularProgressIndicator(
                        valueColor: AlwaysStoppedAnimation<Color>(AppTheme.leafGreenPrimary),
                        strokeWidth: 3,
                      ),
                      const SizedBox(height: 24),
                      Text(
                        _processingStage,
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        'Occlusion Compensation in progress...',
                        style: TextStyle(color: Colors.white54, fontSize: 12),
                      ),
                    ],
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildCornerTick() {
    return Container(width: 14, height: 14, decoration: BoxDecoration(border: Border.all(color: Colors.white, width: 2)));
  }

  Widget _buildModeButton(String title, ScanMode mode) {
    final isSelected = _scanMode == mode;
    return GestureDetector(
      onTap: () => setState(() => _scanMode = mode),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected ? AppTheme.leafGreenPrimary : Colors.transparent,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Text(
          title,
          style: TextStyle(
            color: isSelected ? Colors.white : Colors.white70,
            fontSize: 12,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }

  Widget _buildStepIndicator({
    required int stepNumber,
    required String title,
    required bool isActive,
    required bool isCompleted,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: isActive ? AppTheme.leafGreenPrimary.withOpacity(0.85) : Colors.black45,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          CircleAvatar(
            radius: 9,
            backgroundColor: isCompleted ? Colors.white : (isActive ? Colors.white : Colors.white38),
            child: Text(
              stepNumber.toString(),
              style: TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.bold,
                color: isCompleted || isActive ? AppTheme.leafGreenPrimary : Colors.black54,
              ),
            ),
          ),
          const SizedBox(width: 6),
          Text(
            title,
            style: TextStyle(
              color: isActive ? Colors.white : Colors.white70,
              fontSize: 11,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}
`,
  },
  {
    name: 'quality_report_screen.dart',
    path: 'lib/screens/quality_report_screen.dart',
    description: 'Screen 4: Quality Report with Donut Chart, Defect breakdown, Bounding boxes, and Export CTAs',
    content: `import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import '../theme/app_theme.dart';
import '../widgets/bounding_box_painter.dart';

class QualityReportScreen extends StatefulWidget {
  const QualityReportScreen({super.key});

  @override
  State<QualityReportScreen> createState() => _QualityReportScreenState();
}

class _QualityReportScreenState extends State<QualityReportScreen> {
  int _selectedSurface = 0; // 0 = Top View, 1 = Bottom View

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Lot Quality Report', style: TextStyle(fontWeight: FontWeight.bold)),
        actions: [
          IconButton(
            icon: const Icon(Icons.share_rounded),
            onPressed: () {},
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        children: [
          // Scan Successful Badge
          _buildSuccessBadge(theme),
          const SizedBox(height: 20),

          // Donut Chart: Grade A vs URS
          _buildDonutChartCard(theme),
          const SizedBox(height: 20),

          // Defect Breakdown Card (Rotten, Sprouted, Undersized)
          _buildDefectBreakdownCard(theme),
          const SizedBox(height: 24),

          // Visual Defect Analysis with Bounding Boxes
          _buildAnalyzedImagesSection(theme),
          const SizedBox(height: 32),

          // Action Buttons: PDF/WhatsApp & Blockchain
          _buildActionButtons(context),
          const SizedBox(height: 24),
        ],
      ),
    );
  }

  Widget _buildSuccessBadge(ThemeData theme) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFE8F5E9),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFC8E6C9)),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: const BoxDecoration(
              color: AppTheme.leafGreenPrimary,
              shape: BoxShape.circle,
            ),
            child: const Icon(Icons.check_rounded, color: Colors.white, size: 24),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Scan Successful',
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: const Color(0xFF1B5E20),
                  ),
                ),
                Text(
                  'Certificate ID: #AGRI-2026-NASHIK-9428',
                  style: theme.textTheme.bodySmall?.copyWith(color: const Color(0xFF2E7D32)),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDonutChartCard(ThemeData theme) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Grade Distribution',
              style: theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            SizedBox(
              height: 180,
              child: Stack(
                children: [
                  PieChart(
                    PieChartData(
                      sectionsSpace: 3,
                      centerSpaceRadius: 55,
                      sections: [
                        PieChartSectionData(
                          color: AppTheme.leafGreenPrimary,
                          value: 76.0,
                          title: '76%',
                          radius: 28,
                          titleStyle: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                        PieChartSectionData(
                          color: const Color(0xFFEF5350),
                          value: 24.0,
                          title: '24%',
                          radius: 24,
                          titleStyle: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          '76.0%',
                          style: theme.textTheme.headlineSmall?.copyWith(
                            fontWeight: FontWeight.w800,
                            color: AppTheme.leafGreenPrimary,
                          ),
                        ),
                        const Text(
                          'Grade A',
                          style: TextStyle(fontSize: 11, color: Color(0xFF64748B), fontWeight: FontWeight.w600),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildGradeLegend('Grade A (Premium)', '76.0%', AppTheme.leafGreenPrimary),
                _buildGradeLegend('URS (Defective)', '24.0%', const Color(0xFFEF5350)),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildGradeLegend(String label, String value, Color color) {
    return Row(
      children: [
        Container(width: 12, height: 12, decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
        const SizedBox(width: 8),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label, style: const TextStyle(fontSize: 12, color: Color(0xFF64748B))),
            Text(value, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
          ],
        ),
      ],
    );
  }

  Widget _buildDefectBreakdownCard(ThemeData theme) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Detailed Defect Breakdown',
              style: theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            _buildDefectRow('Rotten', '12.5%', AppTheme.defectRottenRed, 'Detected via bottom basal plate inspection'),
            const Divider(height: 24, color: Color(0xFFF1F5F9)),
            _buildDefectRow('Sprouted', '7.2%', AppTheme.defectSproutedGreen, 'Internal shoots & emerging green tips'),
            const Divider(height: 24, color: Color(0xFFF1F5F9)),
            _buildDefectRow('Undersized', '4.3%', AppTheme.defectUndersizedYellow, 'Diameter < 40mm calibration threshold'),
          ],
        ),
      ),
    );
  }

  Widget _buildDefectRow(String title, String percentage, Color dotColor, String description) {
    return Row(
      children: [
        Container(
          width: 10,
          height: 10,
          decoration: BoxDecoration(color: dotColor, shape: BoxShape.circle),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
              Text(description, style: const TextStyle(fontSize: 11, color: Color(0xFF94A3B8))),
            ],
          ),
        ),
        Text(
          percentage,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 16,
            color: dotColor,
          ),
        ),
      ],
    );
  }

  Widget _buildAnalyzedImagesSection(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'AI Detection Visualizer',
              style: theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
            ),
            // Surface Switcher
            Container(
              padding: const EdgeInsets.all(3),
              decoration: BoxDecoration(
                color: const Color(0xFFE2E8F0),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Row(
                children: [
                  _buildSurfaceTab('Top View', 0),
                  _buildSurfaceTab('Bottom View', 1),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Container(
            height: 220,
            width: double.infinity,
            color: Colors.black,
            child: Stack(
              fit: StackFit.expand,
              children: [
                Image.asset(
                  _selectedSurface == 0 ? 'assets/images/onion_top_view.jpg' : 'assets/images/onion_bottom_view.jpg',
                  fit: BoxFit.cover,
                  errorBuilder: (context, error, stackTrace) => Container(color: const Color(0xFF1E293B)),
                ),
                // Custom Bounding Boxes Overlay
                CustomPaint(
                  painter: BoundingBoxPainter(isBottom: _selectedSurface == 1),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildSurfaceTab(String title, int index) {
    final isSelected = _selectedSurface == index;
    return GestureDetector(
      onTap: () => setState(() => _selectedSurface = index),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
        decoration: BoxDecoration(
          color: isSelected ? Colors.white : Colors.transparent,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Text(
          title,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            color: isSelected ? AppTheme.leafGreenPrimary : const Color(0xFF64748B),
          ),
        ),
      ),
    );
  }

  Widget _buildActionButtons(BuildContext context) {
    return Column(
      children: [
        FilledButton.icon(
          onPressed: () {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Exporting Mandi Quality Certificate to PDF & WhatsApp...')),
            );
          },
          icon: const Icon(Icons.share_outlined),
          label: const Text('Export as PDF / WhatsApp'),
          style: FilledButton.styleFrom(
            backgroundColor: AppTheme.leafGreenPrimary,
            minimumSize: const Size(double.infinity, 52),
          ),
        ),
        const SizedBox(height: 12),
        OutlinedButton.icon(
          onPressed: () {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Lot Hash saved to AgriChain Ledger! Hash: 0x8f2d...3c9a')),
            );
          },
          icon: const Icon(Icons.cloud_done_rounded),
          label: const Text('Save to Blockchain / Database'),
          style: OutlinedButton.styleFrom(
            minimumSize: const Size(double.infinity, 52),
            side: const BorderSide(color: Color(0xFFCBD5E1)),
          ),
        ),
      ],
    );
  }
}
`,
  },
  {
    name: 'bounding_box_painter.dart',
    path: 'lib/widgets/bounding_box_painter.dart',
    description: 'Custom painter for drawing AI defect bounding boxes and confidence tags',
    content: `import 'package:flutter/material.dart';

class BoundingBoxPainter extends CustomPainter {
  final bool isBottom;

  BoundingBoxPainter({required this.isBottom});

  @override
  void paint(Canvas canvas, Size size) {
    final redPaint = Paint()
      ..color = const Color(0xFFD32F2F)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.0;

    final greenPaint = Paint()
      ..color = const Color(0xFF00897B)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.0;

    if (!isBottom) {
      // Top view boxes (e.g. Sprouted & Undersized)
      _drawBoxWithLabel(canvas, size, 0.22, 0.26, 0.20, 0.22, greenPaint, 'Sprouted 94%');
      _drawBoxWithLabel(canvas, size, 0.74, 0.58, 0.18, 0.20, redPaint, 'Neck Rot 88%');
    } else {
      // Bottom view boxes (Occlusion solver: basal plate rot)
      _drawBoxWithLabel(canvas, size, 0.28, 0.35, 0.22, 0.24, redPaint, 'Basal Rot 97%');
      _drawBoxWithLabel(canvas, size, 0.58, 0.42, 0.21, 0.23, redPaint, 'Decay 92%');
    }
  }

  void _drawBoxWithLabel(
    Canvas canvas,
    Size size,
    double nx,
    double ny,
    double nw,
    double nh,
    Paint boxPaint,
    String label,
  ) {
    final rect = Rect.fromLTWH(
      nx * size.width,
      ny * size.height,
      nw * size.width,
      nh * size.height,
    );
    canvas.drawRRect(RRect.fromRectAndRadius(rect, const Radius.circular(6)), boxPaint);

    final textSpan = TextSpan(
      text: label,
      style: const TextStyle(
        color: Colors.white,
        fontSize: 10,
        fontWeight: FontWeight.bold,
      ),
    );
    final textPainter = TextPainter(
      text: textSpan,
      textDirection: TextDirection.ltr,
    )..layout();

    final labelBg = Rect.fromLTWH(
      rect.left,
      rect.top - 16,
      textPainter.width + 8,
      16,
    );
    final bgPaint = Paint()..color = boxPaint.color;
    canvas.drawRRect(RRect.fromRectAndRadius(labelBg, const Radius.circular(3)), bgPaint);
    textPainter.paint(canvas, Offset(rect.left + 4, rect.top - 15));
  }

  @override
  bool shouldRepaint(covariant BoundingBoxPainter oldDelegate) =>
      oldDelegate.isBottom != isBottom;
}
`,
  },
];
