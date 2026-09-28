import 'package:flutter/material.dart';
import 'package:purchases_flutter/purchases_flutter.dart';
import '../services/purchase_service.dart';

class CustomPaywallScreen extends StatefulWidget {
  const CustomPaywallScreen({super.key});

  @override
  State<CustomPaywallScreen> createState() => _CustomPaywallScreenState();
}

class _CustomPaywallScreenState extends State<CustomPaywallScreen> {
  final PurchaseService _purchaseService = PurchaseService();
  
  Offerings? _offerings;
  Package? _selectedPackage;
  bool _isLoading = true;
  bool _isPurchasing = false;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _loadOfferings();
  }

  Future<void> _loadOfferings() async {
    setState(() => _isLoading = true);
    try {
      Offerings? offerings = await _purchaseService.fetchOfferings();
      setState(() {
        _offerings = offerings;
        _isLoading = false;
        
        // Default select Annual/Yearly package if available, else first package
        if (offerings?.current != null && offerings!.current!.availablePackages.isNotEmpty) {
          _selectedPackage = offerings.current!.annual ?? offerings.current!.availablePackages.first;
        }
      });
    } catch (e) {
      setState(() {
        _errorMessage = 'Failed to load subscription plans. Please try again.';
        _isLoading = false;
      });
    }
  }

  Future<void> _handlePurchase() async {
    if (_selectedPackage == null) return;

    setState(() {
      _isPurchasing = true;
      _errorMessage = null;
    });

    try {
      bool success = await _purchaseService.purchasePackage(_selectedPackage!);
      setState(() => _isPurchasing = false);

      if (success && mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('🎉 Welcome to KiddotubesX Pro! Subscription Active.'),
            backgroundColor: Colors.emerald,
          ),
        );
        Navigator.of(context).pop(true);
      }
    } catch (e) {
      setState(() {
        _isPurchasing = false;
        _errorMessage = 'Purchase could not be completed. Please try again.';
      });
    }
  }

  Future<void> _handleRestore() async {
    setState(() => _isPurchasing = true);
    bool restored = await _purchaseService.restorePurchases();
    setState(() => _isPurchasing = false);

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(restored ? '✅ Purchases Restored Successfully!' : 'No Active Subscription Found.'),
          backgroundColor: restored ? Colors.emerald : Colors.orange,
        ),
      );
      if (restored) Navigator.of(context).pop(true);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A), // Dark Slate Background
      body: SafeArea(
        child: Column(
          children: [
            // Top Bar with Close Button & Restore Link
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  IconButton(
                    icon: const Icon(Icons.close_rounded, color: Colors.white70),
                    onPressed: () => Navigator.of(context).pop(),
                  ),
                  TextButton(
                    onPressed: _isPurchasing ? null : _handleRestore,
                    child: const Text(
                      'Restore Purchases',
                      style: TextStyle(color: Colors.amber, fontWeight: FontWeight.bold, fontSize: 13),
                    ),
                  ),
                ],
              ),
            ),

            Expanded(
              child: _isLoading
                  ? const Center(child: CircularProgressIndicator(color: Colors.amber))
                  : SingleChildScrollView(
                      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 10),
                      child: Column(
                        crossAxisAlignment: CrossAlignment.center,
                        children: [
                          // Crown Header Badge
                          Container(
                            padding: const EdgeInsets.all(16),
                            decoration: BoxDecoration(
                              color: Colors.amber.shade400,
                              shape: BoxShape.circle,
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.amber.withOpacity(0.4),
                                  blurRadius: 20,
                                  spreadRadius: 5,
                                ),
                              ],
                            ),
                            child: const Icon(Icons.king_bed_rounded, color: Color(0xFF0F172A), size: 40),
                          ),
                          const SizedBox(height: 16),

                          const Text(
                            'KiddotubesX Pro Pass',
                            style: TextStyle(color: Colors.white, fontSize: 26, fontWeight: FontWeight.black),
                          ),
                          const SizedBox(height: 6),
                          const Text(
                            'Ad-free learning, unlimited AI 3D avatars, and screen time locks for your children.',
                            textAlign: TextAlign.center,
                            style: TextStyle(color: Colors.white70, fontSize: 13, height: 1.4),
                          ),

                          const SizedBox(height: 24),

                          // Perks Checklist
                          _buildPerkItem('🚫 100% Ad-Free Video Playback'),
                          _buildPerkItem('🤖 Unlimited 3D AI Avatar Generations'),
                          _buildPerkItem('⏱️ Advanced Screen Time & Bedtime Routines'),
                          _buildPerkItem('👦 Unlimited Multi-Child Profiles'),
                          _buildPerkItem('🎨 Free PDF Activity Workbooks'),

                          const SizedBox(height: 28),

                          if (_errorMessage != null)
                            Container(
                              padding: const EdgeInsets.all(12),
                              margin: const EdgeInsets.only(bottom: 16),
                              decoration: BoxDecoration(
                                color: Colors.rose.withOpacity(0.2),
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(color: Colors.rose.shade400),
                              ),
                              child: Text(
                                _errorMessage!,
                                style: const TextStyle(color: Colors.rose, fontSize: 12, fontWeight: FontWeight.bold),
                                textAlign: TextAlign.center,
                              ),
                            ),

                          // Product Options Selector Cards
                          if (_offerings?.current != null)
                            ..._buildPackageCards(_offerings!.current!.availablePackages),

                          const SizedBox(height: 24),

                          // Purchase CTA Button
                          SizedBox(
                            width: double.infinity,
                            height: 54,
                            child: ElevatedButton(
                              onPressed: _isPurchasing || _selectedPackage == null ? null : _handlePurchase,
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.amber.shade400,
                                foregroundColor: const Color(0xFF0F172A),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                                elevation: 8,
                              ),
                              child: _isPurchasing
                                  ? const SizedBox(
                                      width: 24,
                                      height: 24,
                                      child: CircularProgressIndicator(color: Color(0xFF0F172A), strokeWidth: 3),
                                    )
                                  : Text(
                                      _getButtonText(),
                                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.black),
                                    ),
                            ),
                          ),

                          const SizedBox(height: 16),
                          const Text(
                            '7-Day Free Trial • Cancel Anytime • No Lock-in',
                            style: TextStyle(color: Colors.white38, fontSize: 11, fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 20),
                        ],
                      ),
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPerkItem(String text) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          const Icon(Icons.check_circle_rounded, color: Colors.emeraldAccent, size: 20),
          const SizedBox(width: 10),
          Text(
            text,
            style: const TextStyle(color: Colors.white90, fontSize: 13, fontWeight: FontWeight.w600),
          ),
        ],
      ),
    );
  }

  List<Widget> _buildPackageCards(List<Package> packages) {
    return packages.map((package) {
      final isSelected = _selectedPackage?.identifier == package.identifier;
      final isAnnual = package.packageType == PackageType.annual;
      final isLifetime = package.packageType == PackageType.lifetime;

      return GestureDetector(
        onTap: () => setState(() => _selectedPackage = package),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: isSelected ? Colors.purple.shade900.withOpacity(0.8) : Colors.white.withOpacity(0.06),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: isSelected ? Colors.amber.shade400 : Colors.white12,
              width: isSelected ? 2 : 1,
            ),
          ),
          child: Row(
            children: [
              Icon(
                isSelected ? Icons.radio_button_checked_rounded : Icons.radio_button_off_rounded,
                color: isSelected ? Colors.amber : Colors.white38,
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(
                          _getPackageTitle(package),
                          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.black, fontSize: 15),
                        ),
                        if (isAnnual) ...[
                          const SizedBox(width: 8),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                            decoration: BoxDecoration(
                              color: Colors.amber,
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: const Text(
                              'SAVE 50%',
                              style: TextStyle(color: Colors.black, fontWeight: FontWeight.black, fontSize: 9),
                            ),
                          ),
                        ],
                      ],
                    ),
                    const SizedBox(height: 2),
                    Text(
                      _getPackageSubtitle(package),
                      style: const TextStyle(color: Colors.white60, fontSize: 12),
                    ),
                  ],
                ),
              ),
              Text(
                package.storeProduct.priceString,
                style: const TextStyle(color: Colors.amber, fontWeight: FontWeight.black, fontSize: 16),
              ),
            ],
          ),
        ),
      );
    }).toList();
  }

  String _getPackageTitle(Package package) {
    switch (package.packageType) {
      case PackageType.annual:
        return 'Yearly Pass';
      case PackageType.monthly:
        return 'Monthly Pass';
      case PackageType.lifetime:
        return 'Lifetime Pro Access';
      default:
        return package.storeProduct.title;
    }
  }

  String _getPackageSubtitle(Package package) {
    switch (package.packageType) {
      case PackageType.annual:
        return '7-Day Free Trial, then billed annually';
      case PackageType.monthly:
        return 'Billed monthly, cancel anytime';
      case PackageType.lifetime:
        return 'One-time payment, unlimited forever';
      default:
        return package.storeProduct.description;
    }
  }

  String _getButtonText() {
    if (_selectedPackage?.packageType == PackageType.annual) {
      return 'Start 7-Day Free Trial';
    } else if (_selectedPackage?.packageType == PackageType.lifetime) {
      return 'Get Lifetime Pro Access';
    }
    return 'Subscribe Now';
  }
}
